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
  FlatList,
  TouchableHighlight,
  Dimensions,
  RefreshControl,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import database from '@react-native-firebase/database';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';

const misArray = ["3MINDIA","AARTIIND","ABB","ABBOTINDIA","ABCAPITAL","ABFRL","ACC","ACCELYA","ADANIENT","ADANIGAS","ADANIPORTS","ADANIPOWER","AIAENG","AJANTPHARM","AKZOINDIA","ALKEM","AMARAJABAT","AMBER","AMBUJACEM","AMRUTANJAN","APLAPOLLO","APOLLOHOSP","APOLLOTYRE","ARVSMART","ASHOKA","ASHOKLEY","ASIANHOTNR","ASIANPAINT","ASTERDM","ASTRAL","ASTRAZEN","ATUL","AUROPHARMA","AUTOAXLES","AVANTIFEED","AXISBANK","BAJAJ-AUTO","BAJAJCON","BAJAJELEC","BAJAJFINSV","BAJAJHLDNG","BAJFINANCE","BALKRISIND","BALMLAWRIE","BALRAMCHIN","BANCOINDIA","BANDHANBNK","BANKBARODA","BANKBEES","BANKINDIA","BATAINDIA","BAYERCROP","BBTC","BDL","BEL","BEML","BERGEPAINT","BHARATFORG","BHARTIARTL","BHEL","BIOCON","BLUEDART","BOMDYEING","BOSCHLTD","BPCL","BRITANNIA","BSE","CADILAHC","CANBK","CANFINHOME","CARBORUNIV","CARERATING","CASTROLIND","CCL","CDSL","CEATLTD","CENTURYPLY","CENTURYTEX","CERA","CESC","CHAMBLFERT","CHENNPETRO","CHOLAFIN","CIPLA","COALINDIA","COCHINSHIP","COFORGE","COLPAL","CONCOR","COROMANDEL","COSMOFILMS","CRISIL","CROMPTON","CSBBANK","CUB","CUMMINSIND","CYIENT","DABUR","DALBHARAT","DBCORP","DCBBANK","DCMSHRIRAM","DEEPAKFERT","DEEPAKNTR","DIVISLAB","DLF","DMART","DREDGECORP","DRREDDY","EICHERMOT","EIDPARRY","ENDURANCE","ENGINERSIN","EQUITAS","ERIS","ESCORTS","EXIDEIND","FACT","FDC","FEDERALBNK","FIEMIND","FINEORG","FORCEMOT","FORTIS","GAIL","GALAXYSURF","GARFIBRES","GEPIL","GESHIP","GICHSGFIN","GILLETTE","GIPCL","GLAXO","GLENMARK","GMBREW","GMDCLTD","GMRINFRA","GODFRYPHLP","GODREJAGRO","GODREJCP","GODREJPROP","GPPL","GRANULES","GRASIM","GREAVESCOT","GREENPLY","GRINDWELL","GRSE","GSFC","GSPL","GUJGASLTD","GULFOILLUB","HAL","HAVELLS","HCLTECH","HDFC","HDFCAMC","HDFCBANK","HDFCLIFE","HEG","HEIDELBERG","HEROMOTOCO","HEXAWARE","HIKAL","HINDALCO","HINDPETRO","HINDUNILVR","HONAUT","HONDAPOWER","HSCL","IBULHSGFIN","ICICIBANK","ICICIBANKN","ICICIGI","ICICIPRULI","ICRA","IDEA","IDFCFIRSTB","IEX","IGL","IIFL","IIFLWAM","INDHOTEL","INDIACEM","INDIAGLYCO","INDIANB","INDIGO","INDOSTAR","INDUSINDBK","INFRATEL","INFY","INSECTICID","IOC","IPCALAB","IRCON","IRCTC","ISEC","ITC","ITI","JAGRAN","JAICORPLTD","JBCHEPHARM","JCHAC","JINDALSAW","JINDALSTEL","JKCEMENT","JKLAKSHMI","JKPAPER","JKTYRE","JMFINANCIL","JSL","JSWENERGY","JSWSTEEL","JTEKTINDIA","JUBLFOOD","JUMPNET","JUSTDIAL","JYOTHYLAB","KAJARIACER","KANSAINER","KCP","KEC","KENNAMET","KIRIINDUS","KIRLOSBROS","KNRCON","KOTAKBANK","KRBL","KSB","KSCL","KTKBANK","L&TFH","LALPATHLAB","LAXMIMACH","LICHSGFIN","LINDEINDIA","LT","LTI","LTTS","LUPIN","LUXIND","M&M","M&MFIN","MAHEPC","MAHSEAMLES","MANAPPURAM","MANGLMCEM","MARICO","MARUTI","MCDOWELL-N","MCX","MEGH","METROPOLIS","MFSL","MGL","MIDHANI","MINDACORP","MINDTREE","MMTC","MOIL","MOLDTKPAC","MOTHERSUMI","MOTILALOFS","MPHASIS","MRF","MRPL","MUTHOOTFIN","NATCOPHARM","NATIONALUM","NAUKRI","NAVKARCORP","NBCC","NCC","NCLIND","NESCO","NESTLEIND","NH","NIACL","NIFTYBEES","NLCINDIA","NMDC","NOCIL","NTPC","OBEROIRLTY","OFSS","OIL","ONGC","ORIENTELEC","PAGEIND","PAPERPROD","PEL","PETRONET","PFIZER","PGHH","PGHL","PHILIPCARB","PHOENIXLTD","PIDILITIND","PIIND","PNB","PNBGILTS","POLYCAB","POLYMED","POWERGRID","PRAJIND","PRESTIGE","PTC","PURVA","PVR","QUICKHEAL","RADICO","RAIN","RAJESHEXPO","RALLIS","RAMCOCEM","RAMCOIND","RBLBANK","RCF","RECLTD","REDINGTON","RELAXO","RELIANCE","RITES","ROHLTD","ROSSARI","SAIL","SANDHAR","SANOFI","SARDAEN","SBICARD","SBILIFE","SBIN","SCHAEFFLER","SCI","SFL","SHK","SHREECEM","SIEMENS","SIS","SIYSIL","SJVN","SKFINDIA","SOLARINDS","SONATSOFTW","SPARC","SPENCERS","SRF","SRTRANSFIN","STAR","STARCEMENT","SUDARSCHEM","SUMICHEM","SUNDARMFIN","SUNDRMFAST","SUNPHARMA","SUNTV","SUPRAJIT","SUPREMEIND","SYMPHONY","SYNGENE","TASTYBITE","TATACHEM","TATACOFFEE","TATACONSUM","TATAELXSI","TATAINVEST","TATAMOTORS","TATAMTRDVR","TATAPOWER","TATASTEEL","TATASTLBSL","TCI","TCS","TEAMLEASE","TECHM","THERMAX","TIDEWATER","TITAN","TNPETRO","TNPL","TORNTPHARM","TORNTPOWER","TRENT","TRITURBINE","TTKPRESTIG","TVSMOTOR","TVSSRICHAK","UBL","UFLEX","UJJIVAN","ULTRACEMCO","UNIONBANK","UPL","VBL","VEDL","VGUARD","VIMTALABS","VINATIORGA","VIPIND","VMART","VOLTAMP","VOLTAS","VSTIND","WABCOINDIA","WATERBASE","WESTLIFE","WHIRLPOOL","WIPRO","WONDERLA","ZEEL","ZYDUSWELL"]

const misSet = new Set(misArray)
let stocks = [];

const LivePerformance: () => React$Node = ({route, navigation}) => {
  const [searchText, setSearchText] = useState(null);

  const [gainers, setGainers] = useState(null);
  const [loosers, setLoosers] = useState(null);

  const [filteredGainers, setFilteredGainers] = useState(null);
  const [filteredLoosers, setFilteredLoosers] = useState(null);
  const [topIndustries, setTopIndustries] = useState(null);
  const [symbolsSet, setSymbolsSet] = useState(new Set());

  const [refreshing, setRefreshing] = useState(false);

  const fetchNifty = async () => {
    symbolsSet.clear();
    setSymbolsSet(new Set());
    setRefreshing(true);
    try {
      let response = await fetch(
        'https://www.nseindia.com',
      );
      let text = await response.text();
      response = await fetch(
        'https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050',
      );
      let json = await response.json();

      let stocksData = []; // read response body as text
      json.data.map(stock => {
        if (stock.identifier !== 'NIFTY 50') {
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
          if (!symbolsSet.has(stock.symbol) && misSet.has(stock.symbol)) {
            stocksData.push(updatedStock);
            symbolsSet.add(stock.symbol);
          }
        }
      });
      stocks = stocksData;
      fetchNiftyNext50();
    } catch (error) {
      Toast.show('Live Performance:' + JSON.stringify(error), Toast.LONG, 1000);
      console.log(error);
    }
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
          open: stock.open,
          low: stock.dayLow,
          high: stock.dayHigh,
          ltp: stock.lastPrice,
          percentChange: stock.pChange,
          symbol: stock.symbol,
          name: stock.meta ? stock.meta.companyName : '',
          industry: stock.meta ? stock.meta.industry : '',
        };
        if (!symbolsSet.has(stock.symbol) && misSet.has(stock.symbol)) {
          stocksData.push(updatedStock);
          symbolsSet.add(stock.symbol);
        }
      }
    });
    stocks = stocks.concat(stocksData);
    fetchNiftySmallCap250();
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
        if (!symbolsSet.has(stock.symbol) && misSet.has(stock.symbol)) {
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
        if (!symbolsSet.has(stock.symbol) && misSet.has(stock.symbol)) {
          stocksData.push(updatedStock);
          symbolsSet.add(stock.symbol);
        }
      }
    });
    stocks = stocks.concat(stocksData);
    fetchNiftyMidcap();
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
          open: stock.open,
          low: stock.dayLow,
          high: stock.dayHigh,
          ltp: stock.lastPrice,
          symbol: stock.symbol,
          percentChange: stock.pChange,
          name: stock.meta ? stock.meta.companyName : '',
          industry: stock.meta ? stock.meta.industry : '',
        };

        if (!symbolsSet.has(stock.symbol) && misSet.has(stock.symbol)) {
          stocksData.push(updatedStock);
          symbolsSet.add(stock.symbol);
        }
      }
    });

    stocks = {data: stocks.concat(stocksData)};
    let gainers = JSON.parse(JSON.stringify(stocks));
    gainers = gainers.data.sort((a, b) => {
      return b.percentChange - a.percentChange;
    });
    console.log('Data Fetched');
    setRefreshing(false);
    let topIndustries = getTopIndustries(gainers.slice(0, 30));

    setTopIndustries(topIndustries);
    setGainers(gainers);
    setFilteredGainers(gainers);

    let loosers = JSON.parse(JSON.stringify(stocks));
    loosers = loosers.data.sort((a, b) => {
      return a.percentChange - b.percentChange;
    });
    setLoosers(loosers);
    setFilteredLoosers(loosers);
  };

  const getTopIndustries = topStocks => {
    let industries = {};
    let counters = 1;
    topStocks.map(item => {
      counters++;
      if (item.industry) {
        if (industries[item.industry]) {
          industries[item.industry] = industries[item.industry] + 1;
        } else {
          industries[item.industry] = 1;
        }
      }
      
    });

    let best = {
      industry: '',
      countOccurrences: 0,
    };

    let secondBest = {
      industry: '',
      countOccurrences: 0,
    };

    for (let key in industries) {
      const count = industries[key];
      if (count > best.countOccurrences) {
        secondBest = best;
        best = {
          industry: key,
          countOccurrences: count,
        };
      }
      else if (count > secondBest.countOccurrences) {
        secondBest = {
          industry: key,
          countOccurrences: count,
        };
      }
    }
    return {
      best: best,
      secondBest: secondBest,
    };
  };

  useEffect(() => {
    fetchNifty();
    setInterval(() => {
      fetchNifty();
    }, 30000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <SearchBar
          lightTheme={true}
          autoCapitalize={false}
          autoCorrect={false}
          placeholder="Search Stock"
          onChangeText={text => {
            setSearchText(text);

            if (text === '') {
              setGainers(gainers);
              setLoosers(loosers);
            } else {
              let filteredGainers = gainers.filter(item => {
                return item.symbol.toLowerCase().includes(text.toLowerCase());
              });
              setFilteredGainers(filteredGainers);

              let filteredLoosers = loosers.filter(item => {
                return item.symbol.toLowerCase().includes(text.toLowerCase());
              });
              setFilteredLoosers(filteredLoosers);
            }
          }}
          value={searchText}
        />
        <View>
          <Text>
            {topIndustries && topIndustries.best && topIndustries.secondBest
              ? topIndustries.best.industry + " and " + topIndustries.secondBest.industry
              : ' ' }
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View
            style={{
              paddingTop: 20,
              backgroundColor: 'white',
              width: Dimensions.get('window').width / 2 - 15,
              borderRadius: 10,
              margin: 5,
            }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  colors={['#9Bd35A', '#689F38']}
                  refreshing={refreshing}
                  onRefresh={() => {
                    fetchNifty();
                  }}
                />
              }
              data={filteredGainers ? filteredGainers : []}
              renderItem={({item, index, separators}) => (
                <View style={{padding: 5}} key={item.key}>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemContentContainer}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{fontSize: 12, marginBottom: 5, width: '60%'}}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            {fontSize: 14, fontWeight: 'bold'},
                            item.percentChange >= 0
                              ? {color: 'green'}
                              : {color: 'red'},
                          ]}>
                          {Math.abs(item.percentChange).toFixed(2)}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <View style={{flexDirection:"row"}}>
                          <Text
                            style={{width: '50%', fontSize: 12, marginBottom: 5}}>
                            {item.symbol}
                          </Text>
                          <Text style={{color:"red"}}>{" " +  (10000.0 / item.ltp).toFixed(0)}</Text>
                        </View>

                        <Text
                          numberOfLines={3}
                          style={{
                            textAlign: 'right',
                            width: '50%',
                            fontSize: 10,
                          }}>
                          {item.industry && item.industry}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => {
                return item.symbol;
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: Dimensions.get('window').width / 2 - 15,
              borderRadius: 10,
              margin: 5,
              paddingTop: 20,
            }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  colors={['#9Bd35A', '#689F38']}
                  refreshing={refreshing}
                  onRefresh={() => {
                    fetchNifty();
                  }}
                />
              }
              data={filteredLoosers ? filteredLoosers : []}
              renderItem={({item, index, separators}) => (
                <View style={{padding: 5}} key={item.key}>
                  <View style={styles.itemContainer}>
                    <View style={styles.itemContentContainer}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{fontSize: 12, marginBottom: 5, width: '60%'}}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            {fontSize: 14, fontWeight: 'bold'},
                            item.percentChange >= 0
                              ? {color: 'green'}
                              : {color: 'red'},
                          ]}>
                          {Math.abs(item.percentChange).toFixed(2)}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <View style={{flexDirection:"row"}}>
                          <Text
                            style={{width: '50%', fontSize: 12, marginBottom: 5}}>
                            {item.symbol}
                          </Text>
                          <Text style={{color:"red"}}>{" " +  (10000.0 / item.ltp).toFixed(0)}</Text>
                        </View>


                        <Text
                          numberOfLines={3}
                          style={{
                            textAlign: 'right',
                            width: '50%',
                            fontSize: 10,
                          }}>
                          {item.industry && item.industry}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => {
                return item.symbol;
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: 'rgb(200, 200, 200)',
    paddingHorizontal: 8,

    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
  itemContainer: {
    height: 80,
  },
  itemContentContainer: {
    justifyContent: 'space-between',
  },
  listHeader: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
  },
});

export default LivePerformance;
