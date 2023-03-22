import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Card from './Card'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addCat } from '../reduxToolkit/Slice5'


const HorizontalList = ({ items }) => {
    const disapatch=useDispatch()
    const goTo=(cat)=>{
        navigation.navigate(wr?'question':'details')
        disapatch(addCat(cat))
    }
    const wr=useSelector(state=>state.question)
    const navigation=useNavigation()
    return (
        <View style={{flex:1,alignItems:"center"}}>
        <FlatList
            scrollEnabled={true}
            numColumns={2}
            data={items}
            keyExtractor={item=>item.id}
            renderItem={({ item }) => {
                return (
                    <Card onPress={()=>{goTo(item.Category)}} item={item} />
                )
            }}

        />
        </View>
    )
}

export default HorizontalList