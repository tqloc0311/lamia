import { Pressable, StyleSheet, ViewProps } from 'react-native';
import React from 'react';
import CImage from '../shared/custom-image';

import { Images } from '../../utils/images';
import { useNavigation } from '@react-navigation/native';
import SubCategory from '../../models/sub-category';
import { Box, Text } from '@lamia/utils/theme';
import { AppNavigationType } from '@lamia/navigation/types';

interface CategoriesRightPanelItemProps extends ViewProps {
  subCategory: SubCategory;
}

const CategoriesRightPanelItem = (props: CategoriesRightPanelItemProps) => {
  const navigation = useNavigation<AppNavigationType>();

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        navigation.navigate('Products');
      }}>
      <Box flex={1} p="1">
        <Box height={64} mb="1" justifyContent="center" alignItems="center">
          <CImage
            style={styles.image}
            source={{ uri: props.subCategory.imageUrl }}
            defaultSource={Images.headerLogo}
          />
        </Box>
        <Text fontSize={12} fontWeight="400" lineHeight={14} textAlign="center">
          {props.subCategory.name}
        </Text>
      </Box>
    </Pressable>
  );
};

export default CategoriesRightPanelItem;

const styles = StyleSheet.create({
  image: {
    borderRadius: 200,
    aspectRatio: 1,
    width: '100%',
    height: '100%',
  },
});
