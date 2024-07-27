import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { Pressable, StyleSheet } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import Category from '@lamia/models/category';
import { Colors } from '@lamia/utils/theme/colors';

interface ProductCollectionTileProps {
  category: Category;
}

const ProductCollectionTile = (props: ProductCollectionTileProps) => {
  return (
    <Pressable
      style={styles.pressable}
      onPress={() => {
        /// ..
      }}>
      <Box flex={1} p="1" alignItems="center">
        <Box
          mb="1"
          justifyContent="center"
          alignItems="center"
          width="100%"
          flex={1}>
          <CImage
            style={styles.image as any}
            source={{
              uri: props.category.image,
            }}
            defaultSource={Images.headerLogo}
          />
        </Box>
        <Box height={16}>
          <Text
            fontSize={12}
            fontWeight="400"
            lineHeight={14}
            textAlign="center">
            {props.category.name}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default ProductCollectionTile;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  image: {
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Colors.gray6,
    aspectRatio: 1,
  },
});
