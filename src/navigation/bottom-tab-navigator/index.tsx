import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainTabBar from './tab-bar';
import { StyleSheet } from 'react-native';
import {
  CategoriesScreen,
  HomeScreen,
  SearchScreen,
  SupportScreen,
} from '../../screens';

import CIcon from '../../components/shared/custom-icon';
import HeaderLogo from '../../components/shared/header-logo';
import { Images } from '../../utils/images';
import { BottomTabParams } from '../types';
import { Box, Text } from '../../utils/theme';
import ProfileNavigator from '../profile-navigator';
import CartButton from '@lamia/components/cart/cart-button';

type Props = {
  navigation: any;
};

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{}}
      sceneContainerStyle={{}}
      tabBar={tabBarProps => (
        <Box
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
          }}>
          <MainTabBar {...tabBarProps} currentUser={null} />
        </Box>
      )}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProductCategories"
        component={CategoriesScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
          headerShown: true,
          headerRight: () => <CartButton />,
          headerShadowVisible: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
          headerShown: true,
          headerRight: () => <CartButton />,
          headerShadowVisible: true,
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
          headerShown: true,
          headerRight: () => <CartButton />,
          headerShadowVisible: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
          headerShown: true,
          headerRight: () => <CartButton />,
          headerShadowVisible: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
