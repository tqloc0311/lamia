import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const StackNavigationScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    fontFamily: 'Inter',
    fontSize: 15,
  },
  gestureEnabled: false,
};
