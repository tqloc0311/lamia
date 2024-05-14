import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductDiscountList from './product-discount-list';
import ProductSortAndFilters from './product-sort-and-filter';

interface ProductListHeaderProps {
  discountShown?: boolean;
}
export const ProductListHeader = (props: ProductListHeaderProps) => {
  return (
    <Box width="auto" bg="white" mx="-3" py="2">
      <ProductSortAndFilters />
      {props.discountShown && <ProductDiscountList mt="4" />}
    </Box>
  );
};
