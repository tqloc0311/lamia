import { Pressable } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';

interface AmountPickerButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const AmountPickerButton = (props: AmountPickerButtonProps) => {
  return (
    <Pressable onPress={props.onPress} disabled={props.disabled}>
      <Box
        width={22}
        height={22}
        bg="gray9"
        justifyContent="center"
        alignItems="center"
        borderRadius="rounded16">
        <Text fontSize={16} color={props.disabled ? 'gray6' : 'primary'}>
          {props.title}
        </Text>
      </Box>
    </Pressable>
  );
};

interface AmountPickerProps {
  value: number;
  maxValue?: number;
  onPick: (value: number) => void;
}

const AmountPicker = (props: AmountPickerProps) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <AmountPickerButton
        title="-"
        onPress={() => {
          props.onPick(props.value - 1);
        }}
      />
      <Box width={40} justifyContent="center" alignItems="center">
        <Text fontSize={16} color="primary">
          {props.value}
        </Text>
      </Box>
      <AmountPickerButton
        title="+"
        onPress={() => {
          props.onPick(props.value + 1);
        }}
      />
    </Box>
  );
};

export default AmountPicker;
