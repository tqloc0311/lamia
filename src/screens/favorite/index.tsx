import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductList from '@lamia/components/products/product-list';

const data = [...Array(10)].map((_, i) => i + 1);
const FavoriteScreen = () => {
  return (
    <Box flex={1} bg="white">
      <ProductList data={data} />
    </Box>
  );
};

export default FavoriteScreen;
