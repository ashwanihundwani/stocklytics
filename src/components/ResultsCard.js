/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
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
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

const ResultsCard: () => React$Node = props => {
  return (
    <View>
      <Text style={styles.listHeader}>{props.sessionsText}</Text>
      <View style={styles.container}>
        <View
          style={{
            padding: 5,
            width: Dimensions.get('screen').width - 10,
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'rgb(200, 200, 200)',
            backgroundColor: 'rgb(235, 235, 235)',
            marginRight: 5,
          }}>
          <FlatList
            data={props.results}
            renderItem={({item, index, separators}) => (
              <View key={item.key}>
                <View style={styles.itemContainer}>
                  <View style={styles.itemContentContainer}>
                    <Text>{item.symbol}</Text>
                    <Text style={{fontWeight: 'bold', backgroundColor: item.colorForResult}}>
                      {item.displayDate}
                    </Text>
                  </View>
                  <View style={{height: 1, backgroundColor: 'gray'}} />
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              props.showLoosers();
            }}>
            <Text style={{alignSelf:"flex-end", color:"blue", fontWeight:"bold"}}>{"More >"}</Text>
        
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 10,
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
    height: 40,
  },
  itemContentContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  listHeader: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
  },
});

export default ResultsCard;
