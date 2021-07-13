import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './screens/welcomeScreen'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator}from 'react-navigation';
import HomeScreen from './screens/HomeScreen'

export default function App() {
  return(
  <AppContainer/>
  )
}
const switchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  HomeScreen:{screen:HomeScreen}
})

const AppContainer=createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
