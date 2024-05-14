import React from 'react';
import CButton from '../shared/custom-button';
import { StyleSheet, ViewProps } from 'react-native';
import { Box } from '@lamia/utils/theme';

interface CartBottomButtonProps extends ViewProps {
  buttonTitle: string;
  onPress: () => void;
}

const CartBottomButton = (props: CartBottomButtonProps) => {
  return (
    <Box p="3" {...props}>
      <CButton filled onPress={props.onPress}>
        {props.buttonTitle}
      </CButton>
    </Box>
  );
};

export default CartBottomButton;
