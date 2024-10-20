import React from 'react';
import { AppStackParams } from '@lamia/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Box, Text } from '@lamia/utils/theme';

type NotificationDetailScreenProps = RouteProp<
  AppStackParams,
  'NotificationDetail'
>;

const NotificationDetailScreen = () => {
  const route = useRoute<NotificationDetailScreenProps>();

  const notification = route.params?.notification;

  return (
    <Box
      backgroundColor="white"
      flex={1}
      paddingVertical="2"
      paddingHorizontal="4">
      <Text>{notification?.title}</Text>
      <Text marginTop="2">{notification?.content}</Text>
    </Box>
  );
};

export default NotificationDetailScreen;
