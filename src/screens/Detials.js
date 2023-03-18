import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { height, width } from '../components/Diemenstions';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer } from '../components/Setup';
const Detials = (props) => {
    const [Images, setImages] = useState('')
    const [Title, setTitle] = useState();
    const [count, setCount] = useState(0)
    const [Music, setMusic] = useState()
    useEffect(() => {
        getData()

    }, [count])

    useEffect(() => {
        setupPlayer()
    }, [Music])
    const cat = props.route.params.cat;
    const data = useSelector(state => state.Items.filter(item => item.Category === cat))
    // console.log(data[0].Image)
    const getData = async () => {

        let isSetup = await setupPlayer()
        await TrackPlayer.reset()
        let Imagess;
        let Titel;
        let track;

        data.map(async (item, index) => {
            if (index == count) {

                Imagess = `asset:/files/${item.Image}`
                Titel = item.Title
                track = {
                    url: `asset:/files/${item.Sound}`, // Load media from the file system
                    title: 'Ice Age',
                    artist: 'deadmau5',
                    // Load artwork from the file system:
                    artwork: `asset:/files/${item.Sound}`,
                    duration: null
                };
            }
        })


        setImages(Imagess)
        setTitle(Titel)
        setMusic(track)
        if (isSetup) {
            await TrackPlayer.add(track)
            await TrackPlayer.play()
      }
    
  

    }
    const paly=async()=>{
        await TrackPlayer.reset()
        await TrackPlayer.add(Music)
        await TrackPlayer.play()
       
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Image style={styles.icon} source={require('../../Assets4/btnhome_normal.png')} />
                <Text style={styles.Titel}>{Title}</Text>
                <Image style={styles.icon} source={require('../../Assets4/btnsetting_normal.png')} />
            </View>
            <View style={styles.imgContainer}>
                {Images && <Image style={{ height: height / 1.45, width: '100%', alignItems: 'center' }} source={{ uri: Images }} />
                }
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={async () =>{ setCount(count - 1) }}><Image style={styles.btn} source={require('../../Assets4/btnprevious_normal.png')} /></TouchableOpacity>
                <TouchableOpacity onPress={() => {paly() }}><Image style={styles.btn2} source={require('../../Assets4/btnrepeat_normal.png')} /></TouchableOpacity>
                <TouchableOpacity onPress={async () => {  setCount(count + 1)}}><Image style={styles.btn} source={require('../../Assets4/btnnext_normal.png')} /></TouchableOpacity>
            </View>
        </View>
    )
}

export default Detials

const styles = StyleSheet.create({
    header: {
        height: height / 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'grey'
    },
    icon: {
        height: height / 14,
        width: width / 7,
        margin: '1%'
    },
    Titel: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    imgContainer: {

        height: height,
        marginTop:'5%'
    },
    btnContainer: {
        position: 'absolute',
        bottom: "9%",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    btn: {
        height: height / 21,
        width: width / 3,
        margin: "1%"
    },
    btn2: {
        height: height / 18,
        width: width / 9,
        margin: "1%"
    }

})