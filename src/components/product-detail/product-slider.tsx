import { FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, Theme } from '@lamia/utils/theme';
import ProductTile from '../products/product-tile';
import { BoxProps } from '@shopify/restyle';

interface ProductSliderProps extends BoxProps<Theme> {
  data: any[];
}

const ITEM_SPACING = 12;

const ProductSlider = (props: ProductSliderProps) => {
  const boxProps: Omit<ProductSliderProps, 'data'> = { ...props };

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const renderItem = (_: any) => {
    return (
      <ProductTile
        styles={{
          width: (layout.width - ITEM_SPACING) / 2,
        }}
      />
    );
  };

  return (
    <Box {...boxProps}>
      <FlatList
        onLayout={event => setLayout(event.nativeEvent.layout)}
        horizontal
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={props.data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </Box>
  );
};

export default ProductSlider;

const styles = StyleSheet.create({
  list: {},
  listContent: {
    gap: ITEM_SPACING,
  },
});
