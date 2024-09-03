import React from 'react';
import { Box } from '@lamia/utils/theme';
import { FlatList } from 'react-native';
import DeliveryAddressItemSkeleton from './delivery-address-item-skeleton';

const data = [...Array(10)].map((_, i) => i + 1);

interface DeliveryAddressListSkeletonProps {}

const DeliveryAddressListSkeleton = (_: DeliveryAddressListSkeletonProps) => {
  const renderItem = () => {
    return <DeliveryAddressItemSkeleton />;
  };

  return (
    <Box flex={1}>
      <FlatList data={data} renderItem={renderItem} scrollEnabled={false} />
    </Box>
  );
};

export default DeliveryAddressListSkeleton;
