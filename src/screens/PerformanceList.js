/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import database from '@react-native-firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

const PerformanceList: () => React$Node = ({route, navigation}) => {

  
  const [searchText, setSearchText] = useState(null)
  const filteredStocks = route.params.stocks.filter((item)=>{
    return item.percentChange > 50 && item.currentPrice < 50
  })
  const [stocks, setStocks] = useState(route.params.stocks)

  return (
    <View 
        style={styles.container}
        
    >
      <View style={{ width:"100%"}}>

      <SearchBar
      lightTheme={true}
      autoCapitalize={false}
      autoCorrect={false}
      
        placeholder="Search Stock"
        onChangeText={(text)=>{
          
          setSearchText(text)
         
          if(text === "") {
        
            setStocks(route.params.stocks)
          }
          else {
            let filteredStocks = route.params.stocks.filter((item)=>{
              return item.symbol.toLowerCase().includes(text.toLowerCase());
            })
            
            setStocks(filteredStocks)
          }
        }}
        value={searchText}
      />
      <View style={{marginTop:40}}>
         <FlatList
            data={stocks}
            renderItem={({item, index, separators}) => (
                <View
                key={item.key}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemContentContainer}>
                    
                        <Text>{item.symbol}</Text>
                        <Text style={[{ fontWeight:"bold"}, item.percentChange >= 0 ? {color:"green"} : {color:"red"}]}>{Math.abs(item.percentChange).toFixed(2)}</Text>
                    </View>
                    <View style={{height:1, backgroundColor:"gray"}}></View>
                </View>
                </View>
            )}
            keyExtractor={(item)=>{
              return item.symbol
            }}
        /> 
        </View>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:500,

      paddingHorizontal:8,
      paddingTop:10,
      flex:1,
      flexDirection:"row",
      marginBottom:20,
      justifyContent:"space-between"
  },
  separator: {
      height:1,
      backgroundColor:"gray"
  },
  itemContainer: {
  
      height:40,
  },
  itemContentContainer:{
      flexDirection:"row",
      
      justifyContent:"space-between"
  },
  listHeader: {
      margin:10,
      fontWeight:"bold",
      fontSize:17,
      marginBottom:10
  }
});

export default PerformanceList;
