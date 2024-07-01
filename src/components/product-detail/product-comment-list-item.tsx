import { FlatList, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { faker } from '@faker-js/faker';
import ProductCommentImageTile from './product-comment-image-tile';

const ProductCommentListItem = () => {
  const images = Array(5).map((_, index) => index + 1);

  return (
    <Box>
      <Box flexDirection="row" alignItems="center">
        <Text fontWeight="700" fontSize={14}>
          Nguyễn Văn A
        </Text>
        <CImage mx="1" size={16} source={Images.star} />
        <Text fontSize={12} fontWeight="400">
          4.5
        </Text>
        <Box flex={1} />
        <Text fontSize={12} fontWeight="400" color="gray4">
          2024-1-01 12:34:56
        </Text>
      </Box>

      <Box height={10} />

      <Box>
        <Text fontSize={12}>{faker.lorem.paragraphs(2)}</Text>
      </Box>

      <Box height={10} />

      <Box>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          horizontal
          data={images}
          renderItem={_ => <ProductCommentImageTile />}
        />
      </Box>

      <Box height={10} />

      <Pressable>
        <Box flexDirection="row">
          <CImage source={Images.thumbUp} size={16} mr="1" />
          <Text fontSize={12}>Hữu ích (99)</Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ProductCommentListItem;

const styles = StyleSheet.create({
  flatListContentContainer: {
    gap: 6,
  },
});
