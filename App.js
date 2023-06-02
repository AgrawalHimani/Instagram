import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {MainStack} from './Root'
// const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <MainStack/>
      </NavigationContainer>
    </Provider>
  );
}

export default App
