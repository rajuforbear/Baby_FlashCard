import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-3339897183017333~3884356789';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const InterstitialAdsScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );

    interstitial.load();

    return unsubscribe;
  }, []);

  return (
    <View style={homeStyle.parentStyle}>
      <Text style={homeStyle.h1}>Integrate admob's ads in react native</Text>
    </View>
  );
};

export default InterstitialAdsScreen;

const homeStyle = StyleSheet.create({
  parentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  h1: {
    marginBottom: 20,
    fontSize: 25,
    color: 'blue',
    textAlign: 'center',
  },
});
