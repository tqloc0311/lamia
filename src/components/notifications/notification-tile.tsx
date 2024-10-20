import { Box, Text } from '@lamia/utils/theme';
import React from 'react';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';
import { Notification } from '@lamia/models/notification';
import { Pressable } from 'react-native';

interface NotificationTileProps {
  data: Notification;
  onPress?: () => void;
}

const NotificationTile: React.FC<NotificationTileProps> = ({
  data,
  onPress,
}: NotificationTileProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        py="4"
        borderBottomColor="gray8"
        borderBottomWidth={1}
        gap="2"
        flexDirection="row"
        rowGap="2">
        <CImage source={Images.bell2} size={20} />
        <Box flex={1}>
          <Text fontWeight={data.is_view ? '500' : '700'}>{data.title}</Text>
          <Text>{data.content}</Text>
          <Text marginTop="2">{data.implement_date}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default NotificationTile;
