import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { Pressable } from 'react-native';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { BoxProps } from '@shopify/restyle';
import { useState } from 'react';
import ProductSort from './product-sort';
import ProductFilter from './product-filter';

interface ProductSortAndFiltersProps {
  numOfProducts: number;
  showFilter?: boolean;
}

interface CombinedProps extends ProductSortAndFiltersProps, BoxProps<Theme> {}

const ProductSortAndFilters = (props: CombinedProps) => {
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [selectedSortId, setSelectedSortId] = useState(1);

  return (
    <Box mx="3" width="auto" flexDirection="row" alignItems="center">
      <ProductSort
        selectedId={selectedSortId}
        didSelect={setSelectedSortId}
        isVisible={isSortModalVisible}
        dismiss={() => setIsSortModalVisible(false)}
      />

      <ProductFilter
        isVisible={isFilterModalVisible}
        dismiss={() => setIsFilterModalVisible(false)}
      />

      {props.numOfProducts > 0 && (
        <Box flex={1}>
          <Text>{`${props.numOfProducts ?? 0} sản phẩm`}</Text>
        </Box>
      )}
      {props.showFilter && (
        <Pressable
          onPress={() => {
            setIsSortModalVisible(true);
          }}>
          <Box flexDirection="row" alignItems="center" px="2">
            <CImage source={Images.sort} mr="1" size={16} />
            <Text>Sắp xếp theo</Text>
          </Box>
        </Pressable>
      )}
      {props.showFilter && (
        <Pressable
          onPress={() => {
            setIsFilterModalVisible(true);
          }}>
          <Box flexDirection="row" alignItems="center" px="2">
            <CImage source={Images.filter} mr="1" size={16} />
            <Text>Bộ lọc</Text>
          </Box>
        </Pressable>
      )}
    </Box>
  );
};

export default ProductSortAndFilters;
