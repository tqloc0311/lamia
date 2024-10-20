import React from 'react';
import { Box } from '@lamia/utils/theme';
import { FlatList, ListRenderItemInfo } from 'react-native';
import NotificationTile from '@lamia/components/notifications/notification-tile';
import { useAppDispatch, useAppSelector } from '@lamia/hooks/context';
import { Notification } from '@lamia/models/notification';
import { useEffectOnce } from 'react-use';
import { fetchNotifications, setNotificationRead } from './actions';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationType } from '@lamia/navigation/types';

const NotificationsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationType>();

  const { notifications } = useAppSelector(state => state.notification);

  useEffectOnce(() => {
    dispatch(fetchNotifications());
  });

  const renderItem = (itemInfo: ListRenderItemInfo<Notification>) => {
    return (
      <NotificationTile
        data={itemInfo.item}
        onPress={() => {
          dispatch(setNotificationRead(itemInfo.item.id));

          navigation.navigate('NotificationDetail', {
            notification: itemInfo.item,
          });
        }}
      />
    );
  };

  return (
    <Box flex={1} bg="white" px="3" py="4">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default NotificationsScreen;
