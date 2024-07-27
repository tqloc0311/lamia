import React from 'react';
import { FlatList, StyleSheet, ViewProps } from 'react-native';
import ProductCollectionTile from './product-collection-tile';
import { Box } from '@lamia/utils/theme';
import { useAppSelector } from '@lamia/hooks/context';

interface ProductCollectionProps extends ViewProps {}

const ProductCollection = (props: ProductCollectionProps) => {
  const promotionItems = useAppSelector(
    state => state.categories.promotionCategories,
  );

  return (
    <Box py="2" width="auto" bg="gray9" {...props}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        horizontal
        data={promotionItems}
        keyExtractor={itemData => itemData.id.toString()}
        renderItem={itemData => (
          <ProductCollectionTile category={itemData.item} />
        )}
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
