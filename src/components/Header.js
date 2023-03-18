import { View, Text, Image } from 'react-native'
import React from 'react'
import { height, width } from './Diemenstions'

const Header = () => {
  return (
    <View style={{height:height/12,flexDirection:'row',justifyContent:'space-between'}}>
      <Image style={{height:height/14,width:width/7,margin:'1%'}} source={require('../../Assets4/btnsseakar.png')}/>
      <Image style={{height:height/14,width:width/7,margin:'1%',}}  source={require('../../Assets4/btnsetting_normal.png')}/>
    </View>
  )
}

export default Header