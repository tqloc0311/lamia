import { faker } from '@faker-js/faker';
import { Box, Text } from '@lamia/utils/theme';
import React from 'react';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';

const NotificationTile = () => {
  return (
    <Box
      py="4"
      borderBottomColor="gray8"
      borderBottomWidth={1}
      gap="2"
      flexDirection="row"
      rowGap="2">
      <CImage source={Images.bell2} size={20} />
      <Box flex={1}>
        <Text fontWeight="700">{faker.lorem.sentence()}</Text>
        <Text>{faker.lorem.sentence()}</Text>
      </Box>
    </Box>
  );
};

export default NotificationTile;
