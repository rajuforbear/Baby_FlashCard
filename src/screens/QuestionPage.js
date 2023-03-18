import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { height, width } from '../components/Diemenstions';


const QuestionPage = (props) => {

    const [rendomdat, setrandomDat] = useState()

    const [Arr, setArr] = useState()
    useEffect(() => {
        getData()
    }, [])
    const cat = props.route.params.cat;
    const data = useSelector(state => state.Items.filter(item => item.Category === cat))

    const getData = () => {
        let arr = [4]
        let count = 0;

        const shuffledData = data.sort(() => Math.random() - 0.5);

        setrandomDat(shuffledData)

    }



    return (
        <View>
            <FlatList
                data={rendomdat?.slice(0,4)}
                initialNumToRender={4}

                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <Image style={{ height: height / 4, width: width / 2 }} source={{ uri: `asset:/files/${item.Image}` }} />
                    )
                }
                }
            />
        </View>
    )
}

export default QuestionPage