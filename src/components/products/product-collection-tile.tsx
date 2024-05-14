import { Box, Text } from '@lamia/utils/theme';
import { Pressable, StyleSheet } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';

const ProductCollectionTile = () => {
  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        /// ..
      }}>
      <Box flex={1} p="1" alignItems="center">
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
        <Box height={16}>
          <Text
            fontSize={12}
            fontWeight="400"
            lineHeight={14}
            textAlign="center">
            Discount
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default ProductCollectionTile;

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 200,
    aspectRatio: 1,
    width: '100%',
    height: 'auto',
  },
});
