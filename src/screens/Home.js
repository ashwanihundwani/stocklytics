/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import {ResultContext} from '../contexts/ResultsContext'

import database from '@react-native-firebase/database';
import PerformanceCard from '../components/PerformanceCard';
import ResultsCard from '../components/ResultsCard';
import SectorsCard from '../components/SectorsCard';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Home: () => React$Node = ({navigation}) => {
  const results = useContext(ResultContext)
  const calculateSectorPerformances = (data, last) => {
    var sectorPerformances = []
    let performances = calculatePastPerformance(data, last)
    let industryCounts = {}
    performances.map((item)=>{

          if(industryCounts[item.industry]) {
            var companies = industryCounts[item.industry]
            companies.push(item)
            industryCounts[item.industry] = companies
          }
          else {
            var companies = []
            companies.push(item)
            industryCounts[item.industry] = companies
          }

    })
    for (let key in industryCounts) {
      if(industryCounts[key].length > 1 && key !== undefined) {
        let companies = industryCounts[key]
        let sum = 0
        companies.map((a) => {
           sum += a.percentChange
        })
        let average = sum/companies.length
        sectorPerformances.push({
          symbol:key,
          percentChange:average
        })
      }
    }
    return sectorPerformances
  };

  const prepareClosingPrices = (data, numSessions) => {
    if(numSessions < data.length) {
      let closingPrices = {}
      for (i = numSessions; i > 0 ; i --) {
        const entry = data[i]
        entry.data.map((item)=> {
          let price = item['Last Traded Price'] ? item['Last Traded Price'] : item['ltp']
          let symbol = item.symbol ? item.symbol : item.Symbol
          if(closingPrices.hasOwnProperty(symbol)) {
            closingPrices[symbol].push(price)
          }
          else {
            let prices = []
            prices.push(price)
            closingPrices["" +symbol + ""] = prices
          }
        })
      }
      return closingPrices
    }
    return {}
  }

  const calculatePastPerformance = (data, last) => {
    if (last >= data.length) {
      return null;
    }
    let firstItemFinal = data[0].data.map(item => {
      return {
        symbol: item.Symbol ? item.Symbol : item.symbol,
        price: item['Last Traded Price'] ? item['Last Traded Price'] : item['ltp'],
        name:item.Name ? item.Name : item.name,
        industry:item.Industry ? item.Industry : item.industry

      };
    });
    const lastItem = data[last].data;
    let lastItemFinal = [];
    let exclusions = []
    //prepare last 3 days data
    if (firstItemFinal && lastItem) {
      for (let mainStock in firstItemFinal) {
        let found = false
        for (let lastStock in lastItem) {
          if (firstItemFinal[mainStock].symbol === lastItem[lastStock].Symbol
            || firstItemFinal[mainStock].symbol === lastItem[lastStock].symbol) {
            const lastScrip = lastItem[lastStock]
            const price = lastScrip['ltp'] ? lastScrip['ltp']  : lastScrip['Last Traded Price'] 
            lastItemFinal.push({
              symbol: lastItem[lastStock].Symbol ? lastItem[lastStock].Symbol : lastItem[lastStock].symbol,
              price: price,
            });
            found = true;
            break;
          }
        }
        if(!found) {
          exclusions.push(firstItemFinal[mainStock].symbol)
        }
      }
    }

    firstItemFinal = firstItemFinal.filter((item)=>{
      return !exclusions.some((excluded) => {
        return excluded === item.symbol
      })
    })

    let performances = [];

    for (let i = 0; i < firstItemFinal.length - 1; i++) {
      
      const first = firstItemFinal[i];
      const last = lastItemFinal[i];
      if(!last) {
        continue
      }
      if(!first.price) {
        const a = 10
      }
      const firstPriceFloat =
        typeof first.price !== 'number'
          ? parseFloat(first.price.replace(/,/g, ''))
          : first.price;
      const lastPriceFloat =
        typeof last.price !== 'number'
          ? parseFloat(last.price.replace(/,/g, ''))
          : last.price;
      let percentChange =
        ((firstPriceFloat - lastPriceFloat) / lastPriceFloat) * 100;
      let performance = {
        percentChange: percentChange,
        currentPrice: firstPriceFloat,
        diff: firstPriceFloat - lastPriceFloat,
        symbol: first.symbol,
        companyName:first.name,
        industry:first.industry
      };
      performances.push(performance);
    }

    return performances.sort((a, b) => {
      return b.percentChange - a.percentChange;
    });
  };
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    
    database()
      .ref()
      .on('value', snapshot => {
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
       
        setTimeout(()=>{
          let lastSessionPerf = calculatePastPerformance(formattedData, 1);
          let industryCounts = {}
          lastSessionPerf.map((item)=>{

            if(industryCounts[item.industry]) {
              var companies = industryCounts[item.industry]
              companies.push(item.companyName)
              industryCounts[item.industry] = companies
            }
            else {
              var companies = []
              companies.push(item.companyName)
              industryCounts[item.industry] = companies
            }

          })
          console.log(JSON.stringify(industryCounts))
        let closingPrices = prepareClosingPrices(formattedData, 15)
        let sinceBottomPerf = calculatePastPerformance(formattedData, formattedData.length - 1);
        let lastThreeSessionsPerf = calculatePastPerformance(formattedData, 2);
        let lastFiveSessionsPerf = calculatePastPerformance(formattedData, 4);
        let lastSevenSessionsPerf = calculatePastPerformance(formattedData, 6);
        let lastNineSessionsPerf = calculatePastPerformance(formattedData, 7);
        let lastFifteenSessionsPerf = calculatePastPerformance(
          formattedData,
          17 ,
        );

        let lastFifteenSessionsSectorPerf = calculateSectorPerformances(
          formattedData,
          29 ,
        );

        let lastThirtySessionsPerf = calculatePastPerformance(
          formattedData,
          29,
        );
        let lastSessionLoosers = JSON.parse(JSON.stringify(lastSessionPerf));
        lastSessionLoosers  = lastSessionLoosers.reverse()

        let sinceBottomLoosers = JSON.parse(JSON.stringify(sinceBottomPerf));
        sinceBottomLoosers  = sinceBottomLoosers.reverse()

        let lastThreeSessionsLoosers = JSON.parse(JSON.stringify(lastThreeSessionsPerf));
        lastThreeSessionsLoosers  = lastThreeSessionsLoosers.reverse()

        let lastFiveSessionsLoosers = JSON.parse(JSON.stringify(lastFiveSessionsPerf));
        lastFiveSessionsLoosers  = lastFiveSessionsLoosers.reverse()

        let lastSevenSessionsLoosers = JSON.parse(JSON.stringify(lastSevenSessionsPerf));
        lastSevenSessionsLoosers  = lastSevenSessionsLoosers.reverse()

        let lastNineSessionsLoosers = JSON.parse(JSON.stringify(lastNineSessionsPerf));
        lastNineSessionsLoosers  = lastNineSessionsLoosers.reverse()

        let lastFifteenSessionsLoosers = lastFifteenSessionsPerf && JSON.parse(JSON.stringify(lastFifteenSessionsPerf));
        lastFifteenSessionsLoosers  = lastFifteenSessionsLoosers.reverse()

        let lastThirtySessionsLoosers = lastThirtySessionsPerf && JSON.parse(JSON.stringify(lastThirtySessionsPerf));
        lastThirtySessionsLoosers  = lastThirtySessionsLoosers && lastThirtySessionsLoosers.reverse()

        setStockData({
          performance: {
            lastFifteenSessionsSectorPerf,
            lastSessionGainers: lastSessionPerf,
            lastSessionLoosers,

            sinceBottomGainers: sinceBottomPerf,
            sinceBottomLoosers,
            
            lastThreeSessionsGainers: lastThreeSessionsPerf,
            lastThreeSessionsLoosers,
            
            lastFiveSessionsGainers: lastFiveSessionsPerf,
            lastFiveSessionsLoosers,

            lastSevenSessionsGainers: lastSevenSessionsPerf,
            lastSevenSessionsLoosers,
            
            lastNineSessionsGainers: lastNineSessionsPerf,
            lastNineSessionsLoosers,

            lastFifteenSessionsGainers: lastFifteenSessionsPerf,
            lastFifteenSessionsLoosers,

            

            lastThirtySessionsGainers: lastThirtySessionsPerf && lastThirtySessionsPerf,
            lastThirtySessionsLoosers
            
          },
        });
        }, 1000)
      });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity onPress={() =>{
          navigation.navigate("UploadService")
        }
          }>
          <Text>UploadService</Text>
        </TouchableOpacity>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <ResultsCard results={results}/>
            <SectorsCard results={stockData && stockData.performance.lastFifteenSessionsSectorPerf}/>
            <PerformanceCard
            sessionsText={'Last Session'}
            gainers={
              stockData &&
              stockData.performance.lastSessionGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.lastSessionLoosers.slice(0, 5)
            }
            showGainers={() => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastSessionGainers,
              });
            }}
            showLoosers={() => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastSessionLoosers,
              });
            }}
          />

          <PerformanceCard
            sessionsText={'Since March 23 - Bottom/COVID crash'}
            gainers={
              stockData &&
              stockData.performance.sinceBottomGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.sinceBottomLoosers.slice(0, 5)
            }
            showGainers={() => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.sinceBottomGainers,
              });
            }}
            showLoosers={() => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.sinceBottomLoosers,
              });
            }}
          />

          <PerformanceCard
            sessionsText={'Last 3 Sessions'}
            gainers={
              stockData &&
              stockData.performance.lastThreeSessionsGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.lastThreeSessionsLoosers.slice(0, 5)
            }
            showGainers={() => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastThreeSessionsGainers,
              });
            }}
            showLoosers={() => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastThreeSessionsLoosers,
              });
            }}
          />
          <PerformanceCard
            sessionsText={'Last 5 Sessions'}
            gainers={
              stockData &&
              stockData.performance.lastFiveSessionsGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.lastFiveSessionsLoosers.slice(0, 5)
            }
            showGainers={(gainers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastFiveSessionsGainers,
              });
            }}
            showLoosers={(loosers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastFiveSessionsLoosers,
              });
            }}
          />
          <PerformanceCard
            sessionsText={'Last 7 Sessions'}
            gainers={
              stockData &&
              stockData.performance.lastSevenSessionsGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.lastSevenSessionsLoosers.slice(0, 5)
            }
            showGainers={(gainers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastSevenSessionsGainers,
              });
            }}
            showLoosers={(loosers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastSevenSessionsLoosers,
              });
            }}
          />
          <PerformanceCard
            sessionsText={'Last 9 Sessions'}
            gainers={
              stockData &&
              stockData.performance.lastNineSessionsGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.lastNineSessionsLoosers.slice(0, 5)
            }
            showGainers={(gainers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastNineSessionsGainers,
              });
            }}
            showLoosers={(loosers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastNineSessionsLoosers,
              });
            }}
          />
        <PerformanceCard
            sessionsText={'Last 12 Sessions'}
            gainers={
              stockData &&
              stockData.performance.lastFifteenSessionsGainers.slice(0, 5)
            }
            losers={
              stockData &&
              stockData.performance.lastFifteenSessionsLoosers.slice(0, 5)
            }
            showGainers={(gainers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastFifteenSessionsGainers,
              });
            }}
            showLoosers={(loosers) => {
              navigation.navigate('Detail', {
                stocks:
                  stockData && stockData.performance.lastFifteenSessionsLoosers,
              });
            }}
          />
        </ScrollView>
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

export default Home;
