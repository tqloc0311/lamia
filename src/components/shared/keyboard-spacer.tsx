import React, { useState, useEffect, FC, useRef } from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  KeyboardEvent,
  KeyboardEventName,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface KeyboardSpacerProps {
  testID?: string;
  iosOnly?: boolean;
  extraHeight?: number;
  avoidInsetsBottom?: boolean;
}

const ANIMATION_DURATION = 250;

const KeyboardSpacer: FC<KeyboardSpacerProps> = ({
  testID,
  extraHeight = 0,
  iosOnly,
  avoidInsetsBottom,
}) => {
  const insets = useSafeAreaInsets();
  const [height, setHeight] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const updateHeight = (value: number) => {
    setHeight(value - (avoidInsetsBottom ? insets.bottom : 0));
  };

  const animateKeyboard = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      useNativeDriver: false,
      duration: ANIMATION_DURATION,
    }).start();
  };

  const handleKeyboardShow = (event: KeyboardEvent) => {
    if (event.endCoordinates?.height) {
      animateKeyboard(event.endCoordinates.height + extraHeight);
    }
  };

  const handleKeyboardHide = () => {
    animateKeyboard(0);
  };

  useEffect(() => {
    const showEvent: KeyboardEventName =
      Platform.select({
        android: 'keyboardDidShow',
        ios: 'keyboardWillShow',
      }) || 'keyboardWillShow';

    const hideEvent: KeyboardEventName =
      Platform.select({
        android: 'keyboardDidHide',
        ios: 'keyboardWillHide',
      }) || 'keyboardWillHide';

    animatedValue.addListener(({ value }) => updateHeight(value));

    const keyboardShowListener = Keyboard.addListener(
      showEvent,
      handleKeyboardShow,
    );
    const keyboardHideListener = Keyboard.addListener(
      hideEvent,
      handleKeyboardHide,
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
      animatedValue.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    extraHeight,
    avoidInsetsBottom,
    insets.bottom,
    animatedValue,
    handleKeyboardShow,
    handleKeyboardHide,
  ]);

  if (iosOnly && Platform.OS !== 'ios') {
    return null;
  }

  return <Animated.View testID={testID} style={{ width: '100%', height }} />;
};

export default KeyboardSpacer;
