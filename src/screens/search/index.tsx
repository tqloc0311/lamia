import React from 'react';
import styles from './styles';
import { Box } from '@lamia/utils/theme';
import ProductList from '@lamia/components/products/product-list';
import CTextInput from '@lamia/components/shared/custom-text-input';

const SearchScreen = () => {
  const data = [...Array(10)].map((_, i) => i + 1);

  return (
    <Box bg="white">
      <Box
        my="3"
        mx="3"
        p="2"
        borderRadius="rounded"
        borderWidth={1}
        borderColor="gray4">
        <CTextInput placeholder="Nhập tên / mã sản phẩm" />
      </Box>
      <ProductList data={data} />
    </Box>
  );
};

export default SearchScreen;
