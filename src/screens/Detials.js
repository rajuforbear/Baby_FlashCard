import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { height, width } from '../components/Diemenstions';
import TrackPlayer from 'react-native-track-player';
import { setupPlayer } from '../components/Setup';
import { } from 'react-native-gesture-handler'
import GestureRecognizer from 'react-native-swipe-gestures';
import { StackActions, useNavigation } from '@react-navigation/native';


const Detials = (props) => {
    useEffect(() => {
        const backAction = async () => {
            await TrackPlayer.reset()
            navigation.dispatch(StackActions.popToTop())
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    const [Images, setImages] = useState('')
    const [Title, setTitle] = useState();
    const [count, setCount] = useState(0)
    const [Music, setMusic] = useState()
    const navigation = useNavigation()
    useEffect(() => {
        getData()

    }, [count])

    const setting = useSelector(state => state.setting)

    var data;
    if (setting.RandomOrder) {
        data = useSelector(state => state.Items.filter((item, index) => item.Category === item.Category).sort(() => Math.random() - 0.5));
    }
    else {
        data = useSelector(state => state.Items)
    }
    const getData = async () => {
        let isSetup = await setupPlayer()
        await TrackPlayer.reset()
        let Imagess;
        let Titel;
        let track;
        let track2;
        let ActualSound;
        let y = data.length
        if (count >= 0 && count <= y - 1) {
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
                    track2 = {
                        url: `asset:/files/${item.ActualSound}`, // Load media from the file system
                        title: 'Ice Age',
                        artist: 'deadmau5',
                        // Load artwork from the file system:
                        artwork: `asset:/files/${item.Sound}`,
                        duration: null
                    };
                    ActualSound = item.ActualSound
                }
            })
        }
        else {
            navigation.dispatch(StackActions.popToTop())
        }
        setImages(Imagess)
        setTitle(Titel)
        if (ActualSound && setting.ActualVoice && setting.Voice) {
            setMusic([track2, track])
        }
        else if (ActualSound && setting.ActualVoice) {
            setMusic(track2)
        }
        else {
            setMusic(track)
        }
        if (isSetup) {
            if (ActualSound && setting.ActualVoice && setting.Voice) {
                await TrackPlayer.add([track2, track])
            }
            else if (ActualSound && setting.ActualVoice) {
                await TrackPlayer.add(track2)
            }
            else if (setting.Voice) {
                await TrackPlayer.add(track)
            }

        }
        await TrackPlayer.play()

    }
    const paly = async () => {
        await TrackPlayer.reset()
        await TrackPlayer.add(Music)
        await TrackPlayer.play()

    }


    return (
        <GestureRecognizer style={{ flex: 1 }}
            onSwipeLeft={() => setting.Swipe && setCount(count + 1)}
            onSwipeRight={() => setting.Swipe && setCount(count - 1)}
        >
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={async () => { await TrackPlayer.reset(), navigation.dispatch(StackActions.popToTop()) }}><Image style={styles.icon} source={require('../../Assets4/btnhome_normal.png')} /></TouchableOpacity>
                    <Text style={styles.Titel}>{setting.English && Title}</Text>
                    <TouchableOpacity onPress={async () => { await TrackPlayer.reset(), navigation.dispatch(StackActions.push('setting', { pr: 'details' })) }}><Image style={styles.icon} source={require('../../Assets4/btnsetting_normal.png')} /></TouchableOpacity>
                </View>
                <View style={styles.imgContainer}>
                    {Images && <Image style={{ height: height / 1.45, width: '100%', alignItems: 'center' }} source={{ uri: Images }} />
                    }
                </View>
                <View style={styles.btnContainer}>
                    {!setting.Swipe && <TouchableOpacity onPress={async () => { setCount(count - 1) }}><Image style={styles.btn} source={require('../../Assets4/btnprevious_normal.png')} /></TouchableOpacity>}
                    <TouchableOpacity onPress={() => { paly() }}><Image style={[styles.btn2, setting.Swipe && { marginLeft: "60%" }]} source={require('../../Assets4/btnrepeat_normal.png')} /></TouchableOpacity>
                    {!setting.Swipe && <TouchableOpacity onPress={async () => { setCount(count + 1) }}><Image style={styles.btn} source={require('../../Assets4/btnnext_normal.png')} /></TouchableOpacity>}
                </View>
            </View>
        </GestureRecognizer>
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
        marginTop: '5%'
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