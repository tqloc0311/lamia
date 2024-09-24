import React from 'react';
import { ListRenderItemInfo, RefreshControl, StyleSheet } from 'react-native';
import { uniqueId } from 'lodash';
import Animated from 'react-native-reanimated';
import { Box, Text } from '@lamia/utils/theme';
import { Images } from '@lamia/utils/images';
import { Colors } from '@lamia/utils/theme/colors';
import { IOrder } from '@lamia/models/order';
import OrderTile from '../order-tile';
import CImage from '@lamia/components/shared/custom-image';

interface OrderListProps {
  onRefresh?: () => void;
  data: IOrder[];
  refreshing?: boolean;
}

const OrderList = (props: OrderListProps) => {
  const renderItem = (data: ListRenderItemInfo<IOrder>) => {
    const order: IOrder = data.item;
    return <OrderTile data={order} style={styles.tile} />;
  };

  const renderEmptyState = () => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box width="50%" aspectRatio={1}>
          <CImage source={Images.noCart} resizeMode="contain" />
        </Box>

        <Text color="gray2" fontSize={12}>
          Hiện tại bạn không có đơn hàng nào!
        </Text>
      </Box>
    );
  };

  const renderSeparator = () => {
    return <Box backgroundColor="gray8" height={10} />;
  };

  return (
    <Animated.FlatList
      keyExtractor={item => item?.id?.toString() || uniqueId()}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={props.data}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyState}
      ItemSeparatorComponent={renderSeparator}
      showsVerticalScrollIndicator={false}
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

export default OrderList;

const styles = StyleSheet.create({
  tile: {
    flex: 1,
  },
  list: {
    backgroundColor: 'white',
  },
  listContent: {
    gap: 12,
    paddingBottom: 100,
  },
});
