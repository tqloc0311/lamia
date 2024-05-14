import Dropdown from '@lamia/components/shared/dropdown';
import StoreTile from '@lamia/components/store-system/store-tile';
import { Box, Text } from '@lamia/utils/theme';
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

const cities = [
  { id: 1, name: 'Hồ Chí Minh' },
  { id: 2, name: 'Hà Nội' },
];

const data = [...Array(10)].map((_, i) => i + 1);

const StoreSystemScreen = () => {
  const renderItem = (data: ListRenderItemInfo<number>) => {
    return <StoreTile />;
  };

  return (
    <Box bg="white" flex={1}>
      <Box bg="gray9" px="3" py="4">
        <Text color="gray2" fontWeight="400" fontSize={12}>
          {`Lamia hiện đang có ${64} cửa hàng trên toàn quốc.\nChọn ngay để biết cửa hàng gần bạn nhất!`}
        </Text>

        <Box height={14} />

        <Dropdown
          data={cities}
          titleKey="name"
          placeholder="Chọn địa điểm"
          initialIndex={0}
        />
      </Box>
      <Box flex={1} px="3">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
        />
      </Box>
    </Box>
  );
};

export default StoreSystemScreen;
