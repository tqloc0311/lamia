import React from 'react';
import { Box } from '@lamia/utils/theme';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { fetchOrders } from './actions';
import OrderList from '@lamia/components/order/order-list';
import OrderListSkeleton from '@lamia/components/order/order-list-skeleton';
import { useEffectOnce } from 'react-use';

const OrderManagementScreen = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector(
    state => state.orderManagementScreen,
  );

  useEffectOnce(() => {
    dispatch(fetchOrders());
  });

  const refresh = () => {
    dispatch(fetchOrders());
  };

  return (
    <Box bg="white" flex={1}>
      {!loading && <OrderList data={orders} onRefresh={refresh} />}
      {loading && <OrderListSkeleton numOfItems={8} />}
    </Box>
  );
};

export default OrderManagementScreen;
