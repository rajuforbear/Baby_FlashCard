import {View, Text, Image, TouchableOpacity, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {height, width} from '../components/Diemenstions';
import {StyleSheet} from 'react-native';
import {setupPlayer} from '../components/Setup';
import TrackPlayer from 'react-native-track-player';
import {RightVOid, WrongVoid} from '../components/WrongVoid';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {addPagable} from '../reduxToolkit/Slicer6';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';
import {
  AppOpenAd,
  TestIds,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {Addsid} from './ads';
const authId = Addsid.Interstitial;
const requestOption = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
};
const QuestionPage = props => {
  const interstitial = InterstitialAd.createForAdRequest(authId, requestOption);
  const tablet = isTablet();
  const disapatch = useDispatch();
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      navigation.dispatch(StackActions.popToTop());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();
  const canlable = useSelector(state => state.cancle);
  const page = useSelector(state => state.page);
  const [song, setSong] = useState();
  const [x, setX] = useState(0);
  const [wrong0, setWrong0] = useState(false);
  const [wrong1, setWrong1] = useState(false);
  const [wrong2, setWrong2] = useState(false);
  const [wrong3, setWrong3] = useState(false);
  const [count, setCount] = useState(1);

  const data = useSelector(state => state.Items);
  const showAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  const IsPlay = async (item, index) => {
    //  console.log('isPlay is fired')
    let isReady = await setupPlayer();
    await TrackPlayer.reset();
    setCount(count + 1);

    if (count > 8) {
      setCount(0), showAdd();
    }
    let arr = [
      (track = {
        url: require('../../asset2/clickon.mp3'), // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',

        duration: null,
      }),
      (track2 = {
        url: `asset:/files/${item.Sound}`, // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',
        // Load artwork from the file system:
        //  artwork: require('../../asset2/clickon.mp3'),
        duration: null,
      }),
    ];
    if (isReady) {
      await TrackPlayer.add(arr);
      await TrackPlayer.play();
    }

    setSong(arr);
    console.log('called');
  };

  const [rendomdat, setrandomDat] = useState(data.slice(0, 4));
  const up = async indexx => {
    await TrackPlayer.reset();
    console.log(x);

    let traxck;
    let track2;
    WrongVoid.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index === 1) {
        traxck = item;
      }
    });
    RightVOid.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index === 1) {
        track2 = item;
      }
    });

    if (indexx === x) {
      if (x != 0) {
        setWrong0(true);
      }
      if (x != 1) {
        setWrong1(true);
      }
      if (x != 2) {
        setWrong2(true);
      }
      if (x != 3) {
        setWrong3(true);
      }
      await TrackPlayer.add(track2);
      setTimeout(() => {
        setWrong0(false);
        setWrong1(false);
        setWrong2(false);
        setWrong3(false);
        const shuffledData = data
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setrandomDat(shuffledData);
      }, 2000);
    } else {
      await TrackPlayer.add(traxck);
      switch (indexx) {
        case 0:
          setWrong0(true);
          break;
        case 1:
          setWrong1(true);
          console.log(indexx);
          break;
        case 2:
          setWrong2(true);
          break;
        case 3:
          setWrong3(true);
          break;
      }
    }

    await TrackPlayer.play();
  };

  useEffect(() => {
    run();
  }, [rendomdat]);
  console.log('this is canclelbe', canlable);

  const run = async () => {
    await TrackPlayer.reset();
    let y = Math.floor(Math.random() * 3);
    rendomdat.map((item, index) => {
      if (index === y) {
        IsPlay(item, index);
        setX(y);
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      page ? sound() : null;
    }, 500);
  }, [canlable]);

  const sound = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(song);
    await TrackPlayer.play();
  };

  const gotoSettings = async () => {
    await TrackPlayer.reset();
    disapatch(addPagable(false));
    navigation.dispatch(StackActions.push('setting', {pr: 'question'}));
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={async () => {
            await TrackPlayer.reset();
            disapatch(addPagable(false));
            navigation.dispatch(StackActions.popToTop());
          }}>
          <Image
            style={styles.icon}
            source={require('../../Assets4/btnhome_normal.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sound()}>
          <Image
            style={styles.btn2}
            source={require('../../Assets4/btnrepeat_normal.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            gotoSettings();
          }}>
          <Image
            style={styles.icon}
            source={require('../../Assets4/btnsetting_normal.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: tablet ? '5%' : '15%', alignSelf: 'center'}}>
        <FlatList
          data={rendomdat}
          numColumns={2}
          keyExtractor={item => item.ID}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  {
                    margin: '1%',
                    marginHorizontal: '1%',
                    marginVertical: '6%',
                    height: height / 3.2,
                    width: width / 2.15,
                  },
                ]}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={{uri: `asset:/files/${item.Image}`}}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.worgImgContainer}>
        <TouchableOpacity onPress={() => up(0)} style={styles.wrongImg1}>
          {wrong0 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => up(1)} style={styles.wrongImg2}>
          {wrong1 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.worgImgContainer2}>
        <TouchableOpacity onPress={() => up(2)} style={styles.wrongImg1}>
          {wrong2 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => up(3)} style={styles.wrongImg2}>
          {wrong3 && (
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/wrongselection.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionPage;
const styles = StyleSheet.create({
  icon: {
    height: hp(7),
    width: hp(7),
    margin: '1%',
  },
  Titel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  header: {
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  btn2: {
    height: hp(6.5),
    width: hp(6.5),
    alignSelf: 'center',
    marginTop: '15%',
  },
  wrongImg1: {
    height: hp(35),
    width: wp(47),
    margin: '1%',
    marginLeft: '2%',
  },
  wrongImg2: {
    height: hp(35),
    width: wp(47),

    marginLeft: '1%',
    marginTop: '1%',
  },
  worgImgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '15.5%',
  },
  worgImgContainer2: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10.8%',
  },
});
