import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Box, Theme } from '@lamia/utils/theme';
import { combineStyles } from '@lamia/utils/helpers';
import { BoxProps } from '@shopify/restyle';

export interface CTextInputProps
  extends Omit<TextInputProps, 'borderWidth' | 'borderColor' | 'borderRadius'>,
    BoxProps<Theme> {}

const CTextInput: React.FC<CTextInputProps> = props => {
  const { style, ...rest } = props;
  const inputStyle = combineStyles(style, styles.input);
  const boxProps: Omit<CTextInputProps, keyof TextInputProps> = { ...rest };
  const inputProps: TextInputProps = Object.fromEntries(
    Object.entries(rest).filter(
      ([key]) => !['borderWidth', 'borderColor', 'borderRadius'].includes(key),
    ),
  ) as TextInputProps;

  return (
    <Box py="1" {...boxProps}>
      <TextInput {...inputProps} style={inputStyle} />
    </Box>
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    paddingVertical: 0,
    borderWidth: 0,
  },
});
