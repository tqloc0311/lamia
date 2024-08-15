import React from 'react';
import {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import ProductTile from './product-tile';
import { ProductListHeader } from './products-header';
import { OptionalProduct } from '@lamia/models/product';
import { Box, Text } from '@lamia/utils/theme';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { Colors } from '@lamia/utils/theme/colors';

interface ProductListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onRefresh?: () => void;
  onEndReached?: () => void;
  data: OptionalProduct[];
  discountShown?: boolean;
  refreshing?: boolean;
  numOfProducts?: number;
}

const ProductList = (props: ProductListProps) => {
  const renderItem = (data: ListRenderItemInfo<OptionalProduct>) => {
    const product: OptionalProduct = data.item;
    return product ? (
      <ProductTile product={product} style={styles.tile} />
    ) : (
      <View style={styles.tile} />
    );
  };

  const renderHeader = () => {
    return (
      <ProductListHeader
        numOfProducts={props.numOfProducts || 0}
        discountShown={props.discountShown}
      />
    );
  };

  const renderEmptyState = () => {
    return (
      <Box justifyContent="center" alignItems="center" mt="4">
        <CImage source={Images.emptyData} size={80} />
        <Text textAlign="center" mt="2" color="gray5">
          Không có dữ liệu
        </Text>
      </Box>
    );
  };

  return (
    <Animated.FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={props.data}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyState}
      numColumns={2}
      columnWrapperStyle={styles.column}
      showsVerticalScrollIndicator={false}
      onScroll={props.onScroll}
      scrollEventThrottle={16}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={0.2}
      refreshControl={
        <RefreshControl
          refreshing={!!props.refreshing}
          onRefresh={props.onRefresh}
          tintColor={Colors.primary}
        />
      }
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  tile: {
    flex: 1,
  },
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
