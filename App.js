import {StyleSheet, AppState, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MyStack from './src/components/MyStack';
import {Provider} from 'react-redux';
import myStore from './src/reduxToolkit/MyStore';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
const App = () => {
  const appState = useRef(AppState.currentState);
  const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });

  const showAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
        setCount(2);
      },
    );
    interstitial.load();
    return unsubscribe;
  };
  const [appStateVisible, setAppStateVisible] = useState(false);
  const [count, setCount] = useState(1);
  const handleAppStateChange = nextState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextState == 'active'
    ) {
      setAppStateVisible(true);
    }
    appState.current = nextState;
    if (appState.current == 'background') {
    }
  };
  useEffect(() => {
    const unsubscribe = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => unsubscribe.remove();
  }, []);
  useEffect(() => {
    if (appStateVisible) showAdd();
  }, [appStateVisible]);

  return (
    <Provider store={myStore}>
      <MyStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
