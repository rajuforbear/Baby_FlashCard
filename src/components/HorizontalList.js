import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Card from './Card'
import { useNavigation } from '@react-navigation/native'


const HorizontalList = ({ items }) => {
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
                    <Card onPress={()=>navigation.navigate('question',{cat:item.Category})} item={item} />
                )
            }}

        />
        </View>
    )
}

export default HorizontalList