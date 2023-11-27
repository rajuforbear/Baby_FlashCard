import {View, Text, Image, TouchableOpacity, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {height, width} from './Diemenstions';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from './Setup';
import {useDispatch, useSelector} from 'react-redux';
import {Sound} from '../reduxToolkit/Slice4';

const Header = ({onPress, onPress2, mute, home}) => {
  const mt = useSelector(state => state.sound);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    play();
  }, [mute]);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (appState.current == 'background') {
        reset();
      } else if (appState.current == 'active') {
        play();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
  console.log('this is mt', mt);
  const reset = async () => {
    await TrackPlayer.reset();
  };
  const play = async () => {
    isReady = await setupPlayer();
    await TrackPlayer.reset();
    let track = {
      url: require('../../asset2/babyflashtheme.mp3'), // Load media from the file system
      title: 'Ice Age',
      artist: 'deadmau5',
      // Load artwork from the file system:
      //artwork: `asset:/files/${item.Sound}`,
      duration: null,
    };
    if (isReady) {
      await TrackPlayer.add(track);
      mute && (await TrackPlayer.play());
    }

    dispatch(Sound(mute));
  };

  return (
    <View
      style={{
        height: height / 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={onPress2}>
        <Image
          style={{height: height / 14, width: width / 7, margin: '1%'}}
          source={
            mt
              ? require('../../Assets4/btnsseakar.png')
              : require('../../Assets4/btnspeakarcancel.png')
          }
        />
      </TouchableOpacity>
      {home && (
        <TouchableOpacity onPress={onPress}>
          <Image
            style={{height: height / 14, width: width / 7, margin: '1%'}}
            source={require('../../Assets4/btnsetting_normal.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
