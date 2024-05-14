import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';

import Layout from '../../constants/Layout';
import { initialize } from './actions';
import { useAppDispatch, useAppSelector } from '../../hooks/context';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationType>();

  const { initialized } = useAppSelector(state => state.app);

  useEffect(() => {
    dispatch(initialize());
  }, []);

  useEffect(() => {
    if (initialized) {
      navigation.navigate('BottomTab');
    }
  }, [initialized]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.indicatorContainer}>
        <SkypeIndicator style={styles.indicator} color="white" size={25} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    width: Layout.window.width / 2,
    height: Layout.window.width / 2,
  },
  logo: { width: '100%', height: '100%' },
  indicatorContainer: {
    width: 25,
    height: 25,
    marginTop: 32,
  },
  indicator: {},
});
