import React from 'react';
import { Box, Theme } from '@lamia/utils/theme';
import { Pressable } from 'react-native';
import { BoxProps } from '@shopify/restyle';
import CImage from './custom-image';
import { Images } from '@lamia/utils/images';

interface SwitchProps extends BoxProps<Theme> {
  value: boolean;
  onValueChanged: (value: boolean) => void;
}

const Switch = (props: SwitchProps) => {
  return (
    <Pressable onPress={() => props.onValueChanged(!props.value)}>
      <Box>
        <CImage
          source={props.value ? Images.switchOn : Images.switchOff}
          size={24}
        />
      </Box>
    </Pressable>
  );
};

export default Switch;
