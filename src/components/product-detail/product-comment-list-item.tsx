import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import Review from '@lamia/models/review';

interface ProductCommentListItemProps {
  review: Review;
}

const ProductCommentListItem: React.FC<ProductCommentListItemProps> = (
  props: ProductCommentListItemProps,
) => {
  return (
    <Box>
      <Box flexDirection="row" alignItems="center">
        <Text fontWeight="700" fontSize={14}>
          {props.review.user.name}
        </Text>
        <Box mx="1">
          <CImage size={16} source={Images.star} />
        </Box>
        <Text fontSize={12} fontWeight="400">
          {props.review.star}
        </Text>
        <Box flex={1} />
        {/* <Text fontSize={12} fontWeight="400" color="gray4">
          2024-1-01 12:34:56
        </Text> */}
      </Box>

      <Box height={10} />

      <Box>
        <Text fontSize={12}>{props.review.comment}</Text>
      </Box>

      {/* <Box height={10} />

      <Box>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentContainer}
          horizontal
          data={images}
          renderItem={_ => <ProductCommentImageTile />}
        />
      </Box> */}

      {/* <Box height={10} />

      <Pressable>
        <Box flexDirection="row">
          <CImage source={Images.thumbUp} size={16} mr="1" />
          <Text fontSize={12}>Hữu ích (99)</Text>
        </Box>
      </Pressable> */}
    </Box>
  );
};

export default ProductCommentListItem;

// const styles = StyleSheet.create({
//   flatListContentContainer: {
//     gap: 6,
//   },
// });
