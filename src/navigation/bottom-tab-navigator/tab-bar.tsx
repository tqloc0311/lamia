import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import CIcon from '../../components/shared/custom-icon';
import User from '../../models/user.ts';
import { Images } from '../../utils/images';
import { useAppSelector } from '../../hooks/context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { useTheme } from '@shopify/restyle';

type Props = {
  state: any;
  navigation: any;
  style?: any;
  currentUser: User | null;
};

enum Tab {
  home = 0,
  products,
  search,
  support,
  user,
}

const getTitle = (tab: Tab): string => {
  switch (tab) {
    case Tab.home:
      return 'Trang chủ';
    case Tab.products:
      return 'Sản phẩm';
    case Tab.search:
      return 'Tìm kiếm';
    case Tab.support:
      return 'Trợ giúp';
    case Tab.user:
      return 'Tài khoản';
  }
};

const getIcon = (tab: Tab) => {
  switch (tab) {
    case Tab.home:
      return Images.bottomTabs.home;
    case Tab.products:
      return Images.bottomTabs.product;
    case Tab.search:
      return Images.bottomTabs.search;
    case Tab.support:
      return Images.bottomTabs.support;
    case Tab.user:
      return Images.bottomTabs.user;
  }
};

const TabBar = (props: Props) => {
  const { state, navigation } = props;
  const isBottomBarTransparent = useAppSelector(
    state => state.app.isBottomBarTransparent,
  );

  const insets = useSafeAreaInsets();

  return (
    <Box
      style={{
        ...styles.tab,
        backgroundColor: isBottomBarTransparent ? 'transparent' : 'white',
        paddingBottom: insets.bottom,
        borderTopWidth: isBottomBarTransparent ? 0 : 1,
      }}>
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // if (route.name == 'Activity' || route.name == 'search') {
            //   if (props.currentUser) {
            //     navigation.navigate(route.name);
            //   } else {
            //     navigation.navigate('userNavigator');
            //   }
            // } else {
            //   navigation.navigate(route.name);
            // }
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={index} onPress={onPress} style={styles.button}>
            <CIcon
              style={styles.icon}
              image={getIcon(index)}
              color={isFocused ? 'primary' : 'inactive'}
              size={24}
            />
            <Text
              fontSize={12}
              fontWeight={isFocused ? '700' : '500'}
              color={isFocused ? 'primary' : 'inactive'}>
              {getTitle(index)}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: -1,
    width: '20%',
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 12,
    borderTopColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.05,
    elevation: 3,
  },
  text: {
    fontSize: 12,
  },
  icon: {
    marginBottom: 4,
  },
});
[];
