import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import Detials from '../screens/Detials'
import QuestionPage from '../screens/QuestionPage'
const Stack=createStackNavigator()

const MyStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='home' component={Home}/>
            <Stack.Screen name='details' component={Detials}/>
            <Stack.Screen name='question' component={QuestionPage}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack