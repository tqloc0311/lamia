import React from 'react';
import { FlatList, StyleSheet, ViewProps } from 'react-native';
import ProductCollectionTile from './product-collection-tile';
import { Box } from '@lamia/utils/theme';
import Category from '@lamia/models/category';

interface ProductCollectionProps extends ViewProps {
  categories: Category[];
  onSelect?: (category: Category) => void;
  selectedId?: number;
}

const ProductCollection = ({
  categories,
  selectedId,
  onSelect,
  ...viewProps
}: ProductCollectionProps) => {
  return (
    <Box py="2" width="auto" bg="gray9" {...viewProps}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        horizontal
        data={categories}
        keyExtractor={itemData => itemData.id.toString()}
        renderItem={itemData => (
          <ProductCollectionTile
            category={itemData.item}
            isSelected={itemData.item.id === selectedId}
            onPress={onSelect}
          />
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
