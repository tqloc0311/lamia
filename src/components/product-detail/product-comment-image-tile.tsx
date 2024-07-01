import React from 'react';
import { Box } from '@lamia/utils/theme';
import { Pressable, StyleSheet } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';

const ProductCommentImageTile = () => {
  return (
    <Pressable
      style={styles.pressable}
      onPress={() => {
        /// ..
      }}>
      <Box flex={1} p="1" alignItems="center" bg="primary">
        <Box mb="1" justifyContent="center" alignItems="center">
          <CImage
            size={40}
            style={styles.image as any}
            source={{
              uri: 'https://e7.pngegg.com/pngimages/524/289/png-clipart-red-and-white-special-discount-icon-special-discount-sign-miscellaneous-discount-signs-thumbnail.png',
            }}
            defaultSource={Images.headerLogo}
          />
        </Box>
      </Box>
    </Pressable>
  );
};

export default ProductCommentImageTile;

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
