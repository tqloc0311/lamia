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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigationType, AppStackParams } from '@lamia/navigation/types';
import { reset } from './store';

type PageScreenProps = RouteProp<AppStackParams, 'Page'>;

const PageScreen = () => {
  const navigation = useNavigation<AppNavigationType>();
  const { loading, data } = useAppSelector(state => state.pageScreen);
  const dispatch = useAppDispatch();
  const route = useRoute<PageScreenProps>();

  const path = route.params?.path;
  const title = route.params?.title;

  navigation.setOptions({
    headerTitle: title,
  });

  useEffectOnce(() => {
    dispatch(fetchData(path));

    return () => {
      dispatch(reset());
    };
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
    // eslint-disable-next-line react-native/no-inline-styles
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

export default PageScreen;
