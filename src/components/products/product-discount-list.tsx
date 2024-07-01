import React from 'react';
import { Box, Theme } from '@lamia/utils/theme';
import ProductDiscountTile from './product-discount-tile';
import { FlatList } from 'react-native';
import { BoxProps } from '@shopify/restyle';

interface ProductDiscountListProps extends BoxProps<Theme> {}

const ProductDiscountList = (props: ProductDiscountListProps) => {
  const data = [...Array(20)].map((_, index) => index + 1);

  const renderItem = () => {
    return <ProductDiscountTile />;
  };

  return (
    <Box width="auto" height={30} {...props}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
        horizontal
        data={data}
        keyExtractor={itemData => itemData.toString()}
        renderItem={_ => renderItem()}
      />
    </Box>
  );
};

export default ProductDiscountList;
