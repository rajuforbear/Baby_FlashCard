import { StyleSheet, Text, View,AppState } from 'react-native'
import React, { useEffect } from 'react'
import MyStack from './src/components/MyStack'
import { Provider } from 'react-redux'
import myStore from './src/reduxToolkit/MyStore'
import TrackPlayer from "react-native-track-player"

const App = () => {
  return (
    <Provider store={myStore}>
      <MyStack />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})