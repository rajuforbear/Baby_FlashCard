import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import Detials from '../screens/Detials'
import QuestionPage from '../screens/QuestionPage'
import SettingScreen from '../screens/SettingScreen'
import SplashScreen from '../screens/SplashScreen'
const Stack=createStackNavigator()

const MyStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='slash'>
            <Stack.Screen name='home' component={Home}/>
            <Stack.Screen name='details' component={Detials}/>
            <Stack.Screen name='question' component={QuestionPage}/>
            <Stack.Screen name='setting' component={SettingScreen}/>
            <Stack.Screen name='slash' component={SplashScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack