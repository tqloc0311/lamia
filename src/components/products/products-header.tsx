import React from 'react';
import { Box } from '@lamia/utils/theme';
import ProductDiscountList from './product-discount-list';
import ProductSortAndFilters from './product-sort-and-filter';

interface ProductListHeaderProps {
  discountShown?: boolean;
  showFilter?: boolean;
  numOfProducts: number;
}
export const ProductListHeader = (props: ProductListHeaderProps) => {
  return (
    <Box width="auto" bg="white" mx="-3" py="2">
      <ProductSortAndFilters
        numOfProducts={props.numOfProducts}
        showFilter={props.showFilter}
      />
      {props.discountShown && <ProductDiscountList mt="4" />}
    </Box>
  );
};
