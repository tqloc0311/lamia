import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductList from '@lamia/components/products/product-list';
import { useAppSelector } from '@lamia/hooks/context';
import { fillArrayToFour } from '@lamia/utils/helpers';

const FavoriteScreen = () => {
  const { favorites } = useAppSelector(state => state.favorite);
  const data = fillArrayToFour(favorites.map(item => item.product) || []);
  return (
    <Box flex={1} bg="white">
      <ProductList data={data} />
    </Box>
  );
};

export default FavoriteScreen;
