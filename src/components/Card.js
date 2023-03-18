import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { height, width } from './Diemenstions'


const Card = ({ item,onPress }) => {
  //const path = require('../../assets/1.jpg')


  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={.8}>
      <Image style={{ height: "100%", width: '100%', resizeMode: 'cover', }} source={item.Image} />
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    height: height / 4.8,
    width: width / 2.2,
    margin: "2%",
    borderRadius: 20,
    overflow: 'hidden',

  }
})