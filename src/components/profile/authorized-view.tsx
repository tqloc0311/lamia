import React from 'react';
import MenuItem from '../shared/menu-item';
import { ScrollView, StyleSheet } from 'react-native';
import MembershipCard from './membership-card';
import { Images } from '@lamia/utils/images';
import { Colors } from '@lamia/utils/theme/colors';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { useTheme } from '@shopify/restyle';
import { ProfileMenuItemType } from '@lamia/utils/types';

interface AuthorizedViewProps {
  logoutHandler: () => void;
  navigateTo: (routeName: string, data: any) => void;
}

const AuthorizedView = (props: AuthorizedViewProps) => {
  const theme = useTheme<Theme>();

  const menuData: ProfileMenuItemType[] = [
    {
      icon: Images.account,
      title: 'Tên của tui',
      appendingTitle: '0909 123 456',
      onPress: () => {
        props.navigateTo('UserInfo', {});
      },
    },
    {
      icon: Images.cart2,
      title: 'Quản lý đơn hàng',
      onPress: () => {
        props.navigateTo('OrderManagement', {});
      },
    },
    {
      icon: Images.location,
      title: 'Địa chỉ nhận hàng',
      onPress: () => {
        props.navigateTo('DeliveryAddress', {});
      },
    },
    {
      icon: Images.bell2,
      title: 'Thông báo của tôi',
      onPress: () => {
        props.navigateTo('Notifications', {});
      },
    },
    {
      icon: Images.heart,
      title: 'Sản phẩm yêu thích',
      onPress: () => {
        props.navigateTo('Favorite', {});
      },
    },
    {
      icon: Images.qr,
      title: 'Scan QR',
    },
    {
      icon: Images.qr,
      title: 'Liên kết thiết bị',
    },
    {
      icon: Images.phone,
      title: 'Liên hệ',
      onPress: () => {
        props.navigateTo('Contact', {});
      },
    },
    {
      icon: Images.chat,
      title: 'Hỗ trợ',
    },
    {
      icon: Images.logout,
      title: 'Đăng xuất',
      color: 'red',
      hasRightArrow: false,
      onPress: () => {
        props.logoutHandler();
      },
    },
  ];

  const createAppendingTitle = (appendingTitle: string) => {
    return (
      <Box flexDirection="row" alignItems="center">
        <Box width={1} height={10} bg="gray3" mx="2" />
        <Text color="gray3">{appendingTitle}</Text>
      </Box>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ paddingBottom: 150 }}>
      <Box flex={1} mt="2">
        <MembershipCard mx="3" />
        {menuData.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            color={item.color}
            hasRightArrow={item.hasRightArrow}
            onPress={item.onPress}
            appendingTitle={
              item.appendingTitle && createAppendingTitle(item.appendingTitle)
            }
          />
        ))}
      </Box>
    </ScrollView>
  );
};

export default AuthorizedView;
