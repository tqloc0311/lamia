import { Pressable, StyleSheet, ViewProps } from 'react-native';
import React from 'react';
import CImage from '../shared/custom-image';

import { Images } from '../../utils/images';
import { useNavigation } from '@react-navigation/native';
import Category from '../../models/category';
import { Box, Text } from '@lamia/utils/theme';
import { AppNavigationType } from '@lamia/navigation/types';

interface CategoriesRightPanelItemProps extends ViewProps {
  category?: Category | null;
}

const CategoriesRightPanelItem = (props: CategoriesRightPanelItemProps) => {
  const navigation = useNavigation<AppNavigationType>();

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => {
        navigation.navigate('Products');
      }}>
      <Box flex={1} p="1">
        {!!props.category && (
          <Box height={64} mb="1" justifyContent="center" alignItems="center">
            <CImage
              style={styles.image}
              source={{ uri: props.category.image }}
              defaultSource={Images.headerLogo}
              resizeMode="stretch"
            />
          </Box>
        )}

        {!!props.category && (
          <Text
            fontSize={12}
            fontWeight="400"
            lineHeight={14}
            textAlign="center">
            {props.category.name}
          </Text>
        )}
      </Box>
    </Pressable>
  );
};

export default CategoriesRightPanelItem;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  image: {
    borderRadius: 200,
    aspectRatio: 1,
    width: '100%',
    height: '100%',
  },
});
