import React from 'react';
import CButton, { CButtonProps } from '../shared/custom-button';
import { TextStyle, ViewStyle } from 'react-native';
import { combineStyles } from '../../utils/helpers';

interface AuthButtonProps extends CButtonProps {
  type?: 'bordered' | 'plain';
}

const AuthButton = (props: AuthButtonProps) => {
  var defaultButtonStyle: ViewStyle = {
    backgroundColor: 'transparent',
    borderWidth: props.type == 'bordered' ? 1 : 0,
    borderColor: 'white',
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const combinedButtonStyle = combineStyles(
    defaultButtonStyle,
    props.buttonStyle,
    props.style,
  );

  var defaultTitleStyle: TextStyle = {
    color: 'white',
  };

  const combinedTitleStyle = combineStyles(defaultTitleStyle, props.titleStyle);

  return (
    <CButton
      {...props}
      buttonStyle={combinedButtonStyle}
      titleStyle={combinedTitleStyle}>
      {props.children}
    </CButton>
  );
};

export default AuthButton;
