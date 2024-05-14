import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Box, Theme } from '@lamia/utils/theme';
import { combineStyles } from '@lamia/utils/helpers';
import { BoxProps } from '@shopify/restyle';

export interface CTextInputProps extends TextInputProps, BoxProps<Theme> {}

const CTextInput = (props: CTextInputProps) => {
  const inputStyle = combineStyles(props.style, styles.input);
  const boxProps: Omit<CTextInputProps, keyof TextInputProps> = { ...props };
  const { borderWidth, borderColor, borderRadius, ...inputProps } = props;

  return (
    <Box py="1" {...boxProps}>
      <TextInput {...inputProps} style={inputStyle} />
    </Box>
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 14,
  },
});
