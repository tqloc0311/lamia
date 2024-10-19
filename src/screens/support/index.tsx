import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box } from '@lamia/utils/theme';
import MenuItem from '../../components/shared/menu-item';
import { menuData } from './data';
import { NativeStackNavigationBaseType } from '@lamia/navigation/types';
import { Linking } from 'react-native';

const SupportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationBaseType>();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(error => console.error(error.message));
  };

  return (
    <Box flex={1} bg="white">
      {menuData.map(item => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          hasRightArrow={false}
          onPress={() => {
            if (item.routeName) {
              navigation.navigate(item.routeName, item.routeData);
            } else if (item.url) {
              openLink(item.url);
            }
          }}
        />
      ))}
    </Box>
  );
};

export default SupportScreen;
