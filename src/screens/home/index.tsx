import React, { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/context';
import { Box } from '@lamia/utils/theme';
import HomeCarousel from '../../components/home/home-carousel';
import { useFocusEffect } from '@react-navigation/native';
import { setBottomBarTransparent } from '../../redux/slices/appSlice.ts';
import SafeAreaWrapper from '@lamia/components/shared/safe-area-wrapper';
import { StyleSheet } from 'react-native';

type HomeScreenProps = {};

const HomeScreen = (_: HomeScreenProps) => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setBottomBarTransparent(true));

      return () => {
        dispatch(setBottomBarTransparent(false));
      };
    }, [dispatch]),
  );

  return (
    <SafeAreaWrapper edges={['right', 'left']}>
      <Box flex={1} style={styles.absoluteFill}>
        <HomeCarousel />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
