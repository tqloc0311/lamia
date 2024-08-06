import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { Colors } from '@lamia/utils/theme/colors';
import { BoxProps } from '@shopify/restyle';

export interface CButtonProps extends ViewProps, BoxProps<Theme> {
  onPress?: () => void;
  isEnabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
  children?: string;
  icon?: React.ReactNode;
  textColor?: string;
  filled?: boolean;
  outline?: boolean;
}

interface CButtonColors {
  enabledBackground: string;
  disabledBackground: string;
  enabledTitle: string;
  disabledTitle: string;
}

const defaultFilledColors: CButtonColors = {
  enabledBackground: Colors.primary,
  disabledBackground: Colors.gray2,
  enabledTitle: '#fff',
  disabledTitle: '#fff',
};

const defaultOutlineColors: CButtonColors = {
  enabledBackground: 'white',
  disabledBackground: 'white',
  enabledTitle: Colors.primary,
  disabledTitle: Colors.gray2,
};

const defaultColors: CButtonColors = {
  enabledBackground: 'transparent',
  disabledBackground: 'transparent',
  enabledTitle: Colors.primary,
  disabledTitle: Colors.gray2,
};

const CButton = (props: CButtonProps) => {
  const isEnabled = props.isEnabled !== undefined ? props.isEnabled : true;
  let colors: CButtonColors;

  if (props.outline) {
    colors = defaultOutlineColors;
  } else if (props.filled) {
    colors = defaultFilledColors;
  } else {
    colors = defaultColors;
  }

  const getButtonStyle = (): ViewStyle => ({
    ...styles.button,
    ...(props.outline && { borderWidth: 1, borderColor: Colors.primary }),
    ...((props.buttonStyle as ViewStyle) ?? {}),
    backgroundColor: isEnabled
      ? colors.enabledBackground
      : colors.disabledBackground,
  });

  const getTextColor = (): string => {
    if (props.textColor) {
      return props.textColor;
    }

    const titleStyleColor = (props.titleStyle as TextStyle)?.color;
    if (titleStyleColor) {
      return titleStyleColor.toString();
    }

    return isEnabled ? colors.enabledTitle : colors.disabledTitle;
  };

  const getTitleStyle = (): TextStyle => ({
    ...styles.title,
    ...((props.titleStyle as TextStyle) ?? {}),
    color: getTextColor(),
  });

  return (
    <Box {...props} style={getButtonStyle()}>
      {props.icon && props.icon}
      <Text style={getTitleStyle()}>{props.children}</Text>
      <Pressable
        disabled={!isEnabled}
        onPress={props.onPress}
        style={styles.wrapper}
      />
    </Box>
  );
};

export default CButton;

const styles = StyleSheet.create({
  button: {
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
  },
  title: {
    textAlign: 'center',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
