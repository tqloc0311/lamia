import React from 'react';
import CButton from '../shared/custom-button';
import { ViewProps } from 'react-native';
import { Box } from '@lamia/utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CartBottomButtonProps extends ViewProps {
  buttonTitle: string;
  disabled?: boolean;
  onPress: () => void;
}

const CartBottomButton = (props: CartBottomButtonProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box px="4" py="2" style={{ marginBottom: insets.bottom }} {...props}>
      <CButton isEnabled={!props.disabled} filled onPress={props.onPress}>
        {props.buttonTitle}
      </CButton>
    </Box>
  );
};

export default CartBottomButton;
