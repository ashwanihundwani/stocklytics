import React, { useState, createContext, useEffect } from 'react'
import database from '@react-native-firebase/database';
let resultCalendarURL = "https://www.nseindia.com/api/event-calendar?index=equities&from_date=6-08-2020&to_date=6-11-2020&subject=Financial%20Results"
import Toast from 'react-native-simple-toast';
export const ResultContext = createContext()
let symbols = {}
const ResultContextProvider = (props) => {
  const [results, setResults] = useState(null)
 
  const fetchSymbols = (topStocks) => {
    if(!topStocks) {
      symbols = require('./symbols_all.json')
      //fetchResults()
      return 
    }
    database()
      .ref('symbols')
      .on('value', snapshot => {
        const data = snapshot.val();
        symbols = data
        
        //fetchResults()
      })
  }

  const colorForResult = (displayDate) => {
    let color = 'rgb(254, 192, 45)'
    let days = futureDays(displayDate)
    if(days > 0 && days < 3) {
      color = "rgb(255, 0, 0)"
    }
    else if(days < 7) {
      color = "rgb(253, 87, 34)"
    }
    
    return color
  }

  const futureDays = (displayDate) => {
    const date1 = new Date(displayDate);
    const date2 = new Date();
    const diffTime = date1 - date2
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
  }

  const displayMessage = (displayDate) => {
    let message = ""
    let days = futureDays(displayDate)
    message = "In next " + days + " days"
    return message
  }

  const fetchResults = async () => {
    try {
      let response = await fetch(
        resultCalendarURL,
      )

      let json = await response.json();
      Toast.show("Result Context Success")
      console.log(json)
      
      let results = json
      let finalResults = results.filter((item)=>{
        return symbols[item.symbol] && futureDays(item.date)
      }).map((item)=> {
        return {
          symbol:item.symbol,
          displayDate:item.date,
          daysLeft:futureDays(item.date),
          displayMessage:displayMessage(item.date),
          colorForResult:colorForResult(item.date)
        }
      }).sort((a,b)=> {
        return a.daysLeft > b.daysLeft
      })
      setResults(finalResults)
    }
    catch(error) {
      Toast.show("Result Context" + error, Toast.LONG)

      console.log(error)
        //alert(error)
    }
  };

  useEffect(()=> {
    fetchSymbols(false)
  }, [])
  return (
    <ResultContext.Provider value={results}>
        {props.children}
    </ResultContext.Provider>
  )
}

export default ResultContextProvider