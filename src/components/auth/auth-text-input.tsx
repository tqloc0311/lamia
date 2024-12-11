import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { combineStyles } from '../../utils/helpers';
import TextInput, { CTextInputProps } from '../shared/custom-text-input';
import { Box } from '@lamia/utils/theme';

interface AuthTextInputProps extends CTextInputProps {}

const AuthTextInput = (props: AuthTextInputProps) => {
  const inputStyle = combineStyles(props.style, styles.input);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const secureTextEntry = props.secureTextEntry && !isPasswordVisible;

  return (
    <Box
      borderBottomColor="white"
      borderBottomWidth={1}
      py="2"
      my="3"
      flexDirection="row"
      alignItems="center">
      <Box flex={1}>
        <TextInput
          placeholderTextColor="white"
          {...props}
          style={inputStyle}
          secureTextEntry={secureTextEntry}
        />
      </Box>
      <TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
        {props.secureTextEntry && isPasswordVisible && (
          <Image
            source={require('../../assets/images/eye_white.png')}
            style={styles.icon}
          />
        )}
        {props.secureTextEntry && !isPasswordVisible && (
          <Image
            source={require('../../assets/images/closed_eye_white.png')}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
    </Box>
  );
};

export default AuthTextInput;

const styles = StyleSheet.create({
  input: {
    color: 'white',
  },
  icon: { width: 20, height: 20 },
});
