import React from 'react';
import { Keyboard, TouchableWithoutFeedback, ViewProps } from 'react-native';

const DismissKeyboardView = (props: ViewProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {props.children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;
