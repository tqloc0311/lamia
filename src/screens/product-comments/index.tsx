import React from 'react';
import { Box } from '@lamia/utils/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParams } from '@lamia/navigation/types';
import ProductCommentList from '@lamia/components/product-detail/product-comment-list';

type ProductCommentsScreenProps = RouteProp<AppStackParams, 'ProductComments'>;

const ProductCommentsScreen = () => {
  const route = useRoute<ProductCommentsScreenProps>();
  const { productId } = route.params ?? {};
  return (
    <Box p="4" backgroundColor="white" flex={1}>
      <ProductCommentList productId={productId} hideButtons />
    </Box>
  );
};

export default ProductCommentsScreen;
