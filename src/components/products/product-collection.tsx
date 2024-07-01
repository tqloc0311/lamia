import React from 'react';
import { FlatList, StyleSheet, ViewProps } from 'react-native';
import ProductCollectionTile from './product-collection-tile';
import { Box } from '@lamia/utils/theme';

interface ProductCollectionProps extends ViewProps {}

const ProductCollection = (props: ProductCollectionProps) => {
  const data = [...Array(20)].map((_, index) => index + 1);
  return (
    <Box py="2" width="auto" bg="gray9" {...props}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        horizontal
        data={data}
        keyExtractor={itemData => itemData.toString()}
        renderItem={_ => <ProductCollectionTile />}
      />
    </Box>
  );
};

export default ProductCollection;

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 16,
    gap: 6,
  },
});
