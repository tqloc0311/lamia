import React from 'react';
import { Box } from '@lamia/utils/theme';
import { FlatList, ListRenderItemInfo } from 'react-native';
import NotificationTile from '@lamia/components/notifications/notification-tile';

const data = [...Array(10)].map((_, i) => i + 1);

const NotificationsScreen = () => {
  const renderItem = (_: ListRenderItemInfo<number>) => {
    return <NotificationTile />;
  };

  return (
    <Box flex={1} bg="white" px="3" py="4">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default NotificationsScreen;
