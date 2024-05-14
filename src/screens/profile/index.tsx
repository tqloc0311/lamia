import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/context';
import AuthorizedView from '../../components/profile/authorized-view';
import UnauthorizedView from '../../components/profile/unauthorized-view';
import { logout } from './actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationBaseType } from '@lamia/navigation/types';

const ProfileScreen = () => {
  const currentUser = useAppSelector(state => state.app.currentUser);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationBaseType>();

  return currentUser ? (
    <AuthorizedView
      logoutHandler={() => {
        dispatch(logout());
      }}
      navigateTo={(routeName, data) => {
        navigation.navigate(routeName, data);
      }}
    />
  ) : (
    <UnauthorizedView />
  );
};

export default ProfileScreen;
