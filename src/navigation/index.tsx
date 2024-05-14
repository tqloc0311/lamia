import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaEdgesContext, useAppSelector } from '../hooks/context';
import AppNavigator from './app-navigator';

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
