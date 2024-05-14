import React from 'react';
import MenuItem from '../shared/menu-item';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Images } from '@lamia/utils/images';
import { Box, Theme } from '@lamia/utils/theme';
import { useTheme } from '@shopify/restyle';
import { ProfileMenuItemType } from '@lamia/utils/types';

interface Props {}

const UnauthorizedView = (props: Props) => {
  const theme = useTheme<Theme>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const menuData: ProfileMenuItemType[] = [
    {
      icon: Images.bell,
      title: 'Thông báo của tôi',
    },
    {
      icon: Images.support,
      title: 'Liên hệ',
    },
    {
      icon: Images.logout,
      title: 'Đăng nhập / Đăng ký',
      color: 'red',
      hasRightArrow: false,
      onPress: () => {
        navigation.navigate('Login');
      },
    },
  ];

  return (
    <Box flex={1} bg="white">
      {menuData.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          title={item.title}
          color={item.color}
          hasRightArrow={item.hasRightArrow}
          onPress={item.onPress}
        />
      ))}
    </Box>
  );
};

export default UnauthorizedView;
