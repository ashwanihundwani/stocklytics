/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import database from '@react-native-firebase/database';
let stocks = [];
let symbolsSet = new Set();
const UploadService: () => React$Node = ({navigation}) => {
    const getMonthString = (value) => {
        switch(value + 1) {
            case 1:
                return "January"
            case 2:
                return "February"
            case 3:
                return "March"
            case 4:
                return "April"
            case 5:
                return "May"
            case 6:
                return "June"
            case 7:
                return "July"
            case 8:
                return "August"
            case 9:
                return "September"
            case 10:
                return "October"
            case 11:
                return "November"
            case 12:
            return "December"
                
                
                
                
                

        }
    }
  const [niftyStocks, setNiftyStocks] = useState(null);

  const fetchNifty = async () => {
    let response = await fetch(
      'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050',
    );
    let json = await response.json();
    let stocksData = []; // read response body as text
    json.data.map(stock => {
      if (stock.identifier !== 'NIFTY 50') {
        let updatedStock = {
          Open: stock.open,
          Low: stock.dayLow,
          High: stock.dayHigh,
          'Last Traded Price': stock.lastPrice,
          Symbol: stock.symbol,
          Name: stock.meta ? stock.meta.companyName : '',
          Industry: stock.meta ? stock.meta.industry : '',
        };
        stocksData.push(updatedStock);
      }
    });
    stocks = stocks.concat(stocksData);
    fetchNiftyNext50();
  };
  const fetchNiftyNext50 = async () => {
    let response = await fetch(
      'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20NEXT%2050',
    );
    let json = await response.json(); // read response body as text

    let stocksData = []; // read response body as text
    json.data.map(stock => {
      if (stock.identifier !== 'NIFTY NEXT 50') {
        let updatedStock = {
          Open: stock.open,
          Low: stock.dayLow,
          High: stock.dayHigh,
          'Last Traded Price': stock.lastPrice,
          Symbol: stock.symbol,
          Name: stock.meta ? stock.meta.companyName : '',
          Industry: stock.meta ? stock.meta.industry : '',
        };
        stocksData.push(updatedStock);
      }
    });
    stocks = stocks.concat(stocksData);
    fetchNiftySmallCap250();
  };
  const fetchNiftyMidcap = async () => {
    let response = await fetch(
      'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20MIDCAP%20150',
    );
    let json = await response.json(); // read response body as text

    let stocksData = []; // read response body as text
    json.data.map(stock => {
      if (stock.identifier !== 'NIFTY MIDCAP 150') {
        let updatedStock = {
          Open: stock.open,
          Low: stock.dayLow,
          High: stock.dayHigh,
          'Last Traded Price': stock.lastPrice,
          Symbol: stock.symbol,
          Name: stock.meta ? stock.meta.companyName : '',
          Industry: stock.meta ? stock.meta.industry : '',
        };
        if (!symbolsSet.has(stock.symbol)) {
          stocksData.push(updatedStock);
          symbolsSet.add(stock.symbol);
        }
      }
    });
    stocks = {data: stocks.concat(stocksData)};
    let today = new Date()
    let dateEntry = today.getDate() > 9 ? today.getDate() : "0" + today.getDate()
    dateEntry +=  '-' + getMonthString(today.getMonth()) + "-" + today.getFullYear()
    Toast.show(typeof(dateEntry))
    alert(stocks.data.length)
    if(stocks.data.length < 400) {
      return ;
    }
    database()
      .ref(dateEntry)
      .set(stocks)
      .then(() => alert("Record set"));
  };

  const fetchNiftySmallCap250 = async () => {
    let response = await fetch(
      'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20SMALLCAP%20250',
    );
    let json = await response.json(); // read response body as text

    let stocksData = []; // read response body as text
    json.data.map(stock => {
      if (stock.identifier !== 'NIFTY NEXT 50') {
        let updatedStock = {
          open: stock.open,
          low: stock.dayLow,
          high: stock.dayHigh,
          ltp: stock.lastPrice,
          percentChange: stock.pChange,
          symbol: stock.symbol,
          name: stock.meta ? stock.meta.companyName : '',
          industry: stock.meta ? stock.meta.industry : '',
        };
        if (!symbolsSet.has(stock.symbol)) {
          stocksData.push(updatedStock);
          symbolsSet.add(stock.symbol);
        }
      }
    });
    stocks = stocks.concat(stocksData);
    fetchNiftyMidCap400();
  };
  const fetchNiftyMidCap400 = async () => {
    let response = await fetch(
      'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20MIDSMALLCAP%20400',
    );
    let json = await response.json(); // read response body as text

    let stocksData = []; // read response body as text
    json.data.map(stock => {
      if (stock.identifier !== 'NIFTY NEXT 50') {
        let updatedStock = {
          open: stock.open,
          low: stock.dayLow,
          high: stock.dayHigh,
          ltp: stock.lastPrice,
          percentChange: stock.pChange,
          symbol: stock.symbol,
          name: stock.meta ? stock.meta.companyName : '',
          industry: stock.meta ? stock.meta.industry : '',
        };
        if (!symbolsSet.has(stock.symbol)) {
          stocksData.push(updatedStock);
          symbolsSet.add(stock.symbol);
        }
      }
    });
    stocks = stocks.concat(stocksData);
    fetchNiftyMidcap();
  };
  useEffect(() => {

    database()
      .ref()
      .once('value', snapshot => {
        const data = snapshot.val();
        let dates = Object.keys(data);
        dates = dates.sort((a, b) => {
          return Date.parse(b) - Date.parse(a);
        });
        let formattedData = [];
        dates.map(item => {
          const dateWiseData = {
            date: item,
            data: data[item].data,
          };
          formattedData.push(dateWiseData);
        });
        let currentDate = new Date();
        let lastDate = new Date(Date.parse(dates[0]));
        if (
          currentDate.getDay() === lastDate.getDay() &&
          currentDate.getMonth() === lastDate.getMonth() &&
          currentDate.getFullYear() === lastDate.getFullYear()
        ) {
          fetchNifty();
          return;
        } else {
          fetchNifty();
        }
      });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default UploadService;
