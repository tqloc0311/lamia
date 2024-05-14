import { combineStyles } from '@lamia/utils/helpers';
import React from 'react';
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';

interface SafeAreaWrapperProps extends NativeSafeAreaViewProps {
  backgroundColor?: string;
}

const SafeAreaWrapper = (props: SafeAreaWrapperProps) => {
  const defaultStyle = {
    flex: 1,
    backgroundColor: props.backgroundColor,
  };

  const combinedStyle = combineStyles(defaultStyle, props.style);

  return (
    <SafeAreaView {...props} style={combinedStyle}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
