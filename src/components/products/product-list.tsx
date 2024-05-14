import { Box } from '@lamia/utils/theme';
import React from 'react';
import {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import ProductTile from './product-tile';
import { ProductListHeader } from './products-header';

interface ProductListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  data: any[];
  discountShown?: boolean;
}

const ProductList = (props: ProductListProps) => {
  const renderItem = (data: any) => {
    return <ProductTile styles={{ flex: 1 }} />;
  };

  const renderHeader = () => {
    return <ProductListHeader discountShown={props.discountShown} />;
  };

  return (
    <Animated.FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={props.data}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderHeader}
      numColumns={2}
      columnWrapperStyle={styles.column}
      showsVerticalScrollIndicator={false}
      onScroll={props.onScroll}
      scrollEventThrottle={16}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {},
  listContent: {
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  column: {
    gap: 12,
  },
});
