import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box } from '@lamia/utils/theme';
import MenuItem from '../../components/shared/menu-item';
import { menuData } from './data';
import { NativeStackNavigationBaseType } from '@lamia/navigation/types';

const SupportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationBaseType>();

  return (
    <Box flex={1} bg="white">
      {menuData.map((item, index) => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          hasRightArrow={false}
          onPress={() => {
            if (item.routeName != '') {
              navigation.navigate(item.routeName, item.routeData);
            }
          }}
        />
      ))}
    </Box>
  );
};

export default SupportScreen;
