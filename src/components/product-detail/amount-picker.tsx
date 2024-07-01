import { Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  initialValue?: number;
  maxValue?: number;
  onPick: (value: number) => void;
}

const AmountPicker = (props: AmountPickerProps) => {
  const [value, setValue] = useState<number>(props.initialValue ?? 1);

  useEffect(() => {
    props.onPick(value);
  }, [value, props]);

  return (
    <Box flexDirection="row" alignItems="center">
      <AmountPickerButton
        title="-"
        onPress={() => {
          setValue(prev => {
            if (prev > 1) {
              return prev - 1;
            }

            return prev;
          });
        }}
      />
      <Box width={40} justifyContent="center" alignItems="center">
        <Text fontSize={16} color="primary">
          {value}
        </Text>
      </Box>
      <AmountPickerButton
        title="+"
        onPress={() => {
          setValue(prev => {
            if ((props.maxValue && prev < props.maxValue) || !props.maxValue) {
              return prev + 1;
            }

            return prev;
          });
        }}
      />
    </Box>
  );
};

export default AmountPicker;
