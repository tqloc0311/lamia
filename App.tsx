/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';
import Navigation from './src/navigation';
import { ThemeProvider } from '@shopify/restyle';
import theme from './src/utils/theme';
import ToastHelper from './src/utils/toast-helper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalPortal } from 'react-native-modals';
import { initFirebaseMessaging } from './src/services/firebase';

LogBox.ignoreAllLogs(true);

const App = () => {
  useEffect(() => {
    initFirebaseMessaging();
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <View style={{ flex: 1 }}>
              <SafeAreaView
                edges={['right', 'left']}
                style={{
                  flex: 1,
                  paddingTop: -(StatusBar.currentHeight ?? 0),
                  backgroundColor: '#fff',
                }}>
                <StatusBar
                  translucent
                  backgroundColor="transparent"
                  barStyle="dark-content"
                />
                <Provider store={store}>
                  <Navigation />
                  <ModalPortal />
                </Provider>
              </SafeAreaView>
            </View>
          </SafeAreaProvider>
        </ThemeProvider>
      </GestureHandlerRootView>

      <Toast config={ToastHelper.getToastConfig()} />
    </>
  );
};

export default App;
