import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';

import Home from './Home';
import UploadService from '../UploadService';
import PerformanceList from './PerformanceList';
import LivePerformance from './LivePerformance';
import ResultContextProvider from '../contexts/ResultsContext'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={PerformanceList} />
      <Stack.Screen name="UploadService" component={UploadService} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (  
    <ResultContextProvider>
         <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="LivePerformance" component={LivePerformance} />
          <Tab.Screen name="Home" component={HomeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </ResultContextProvider>
  );
}
