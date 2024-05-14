import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import store from './src/redux/store';
import Navigation from './src/navigation';
import { ThemeProvider } from '@shopify/restyle';
import theme from './src/utils/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalPortal } from 'react-native-modals';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
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
  );
};

export default App;
