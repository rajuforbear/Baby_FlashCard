import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from '../reduxToolkit/Slice';
import HorizontalList from '../components/HorizontalList';
import Header from '../components/Header';
import MyData from '../components/CatagotyData';
import {useNavigation} from '@react-navigation/native';
var SQLite = require('react-native-sqlite-storage');
import {addSetting} from '../reduxToolkit/Slice2';
import {QuestionMode} from '../reduxToolkit/Slice3';
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  GAMBannerAd,
  BannerAdSize,
  AdEventType,
} from 'react-native-google-mobile-ads';
import {Addsid} from './ads';
const db = SQLite.openDatabase({
  name: 'eFlashEngishinappnew.db',
  createFromLocation: 1,
});
import mobileAds from 'react-native-google-mobile-ads';
const Home = () => {
  const muted = useSelector(state => state.sound);
  const Navigation = useNavigation();
  const [mute, setMute] = useState(muted);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
  //     appOpenAd.show();
  //   });
  //   // Start loading the interstitial straight away
  //   appOpenAd.load();
  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../Assets4/bgnewcategory.png')}>
      <Header
        onPress2={() => setMute(!mute)}
        mute={mute}
        onPress={() => Navigation.navigate('setting', {pr: 'home'})}
        home
      />
      <HorizontalList items={MyData} />
      <GAMBannerAd
        unitId={TestIds.BANNER}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({});
