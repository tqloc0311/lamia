/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainTabBar from './tab-bar';
import { StyleSheet } from 'react-native';
import {
  CategoriesScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
  SupportScreen,
} from '../../screens';
import HeaderLogo from '../../components/shared/header-logo';
import { BottomTabParams } from '../types';
import { Box } from '../../utils/theme';
import CartButton from '@lamia/components/cart/cart-button';
import { Colors } from '@lamia/utils/theme/colors';

type Props = {
  navigation: any;
};

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator = (_: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{}}
      sceneContainerStyle={{}}
      tabBar={tabBarProps => (
        <Box style={styles.tabBarWrapper}>
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
          headerStyle: {
            borderBottomColor: Colors.gray8,
            borderBottomWidth: 1,
          },
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
          headerStyle: {
            borderBottomColor: Colors.gray8,
            borderBottomWidth: 1,
          },
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
          headerStyle: {
            borderBottomColor: Colors.gray8,
            borderBottomWidth: 1,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <HeaderLogo />,
          headerShown: true,
          headerRight: () => <CartButton />,
          headerShadowVisible: true,
          headerStyle: {
            borderBottomColor: Colors.gray8,
            borderBottomWidth: 1,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
});
