import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { combineStyles } from '../../utils/helpers';
import TextInput, { CTextInputProps } from '../shared/custom-text-input';
import { Box } from '@lamia/utils/theme';

interface AuthTextInputProps extends CTextInputProps {}

const AuthTextInput = (props: AuthTextInputProps) => {
  const inputStyle = combineStyles(props.style, styles.input);

  return (
    <Box borderBottomColor="white" borderBottomWidth={1} py="2" my="3">
      <TextInput placeholderTextColor="white" {...props} style={inputStyle} />
    </Box>
  );
};

export default AuthTextInput;

const styles = StyleSheet.create({
  input: {
    color: 'white',
  },
});
