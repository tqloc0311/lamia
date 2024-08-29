import React from 'react';
import { Box } from '@lamia/utils/theme';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { useEffectOnce } from 'react-use';
import { fetchData } from './actions';
import { Colors } from '@lamia/utils/theme/colors';
import Layout from '@lamia/constants/Layout';
import RenderHTML from 'react-native-render-html';

type PaymentPolicyScreenProps = {};

const PaymentPolicyScreen = (_: PaymentPolicyScreenProps) => {
  const { loading, data } = useAppSelector(state => state.paymentPolicyScreen);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchData());
  });

  if (loading) {
    return (
      <Box
        bg="white"
        paddingVertical="4"
        borderWidth={1}
        flex={1}
        justifyContent="center">
        <ActivityIndicator color={Colors.primary} />
      </Box>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <AutoHeightImage
          width={Layout.window.width}
          source={{ uri: data?.image || '' }}
        />
        <Box paddingHorizontal="4">
          <RenderHTML
            contentWidth={Layout.window.width - 32}
            source={{ html: data?.content || '' }}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentPolicyScreen;
