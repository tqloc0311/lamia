import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import OrderTileSkeleton from '../order-tile-skeleton';

interface OrderListSkeletonProps {
  numOfItems: number;
}
const OrderListSkeleton = (props: OrderListSkeletonProps) => {
  const data = useMemo(
    () => [...Array(props.numOfItems)].map((_, i) => i + 1),
    [props.numOfItems],
  );

  return (
    <FlatList
      data={data}
      style={styles.list}
      renderItem={() => <OrderTileSkeleton />}
      contentContainerStyle={styles.listContent}
      scrollEnabled={false}
    />
  );
};

export default OrderListSkeleton;

const styles = StyleSheet.create({
  list: {
    marginTop: 12,
  },
  listContent: {
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
});
