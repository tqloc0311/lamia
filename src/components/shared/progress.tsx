import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';

const BAR_HEIGHT = 6;

interface ProgressProps extends BoxProps<Theme> {
  value: number;
}

const Progress = (props: ProgressProps) => {
  const widthValue = `${(props.value * 100).toFixed(0)}%`;

  return (
    <Box {...props}>
      <Box width="auto" height={BAR_HEIGHT}>
        <Box flex={1} bg="gray200" borderRadius="rounded12" />
        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          height="100%"
          width={widthValue as any}
          bg="yellow"
          borderRadius="rounded12"
        />
      </Box>
    </Box>
  );
};

export default Progress;

const styles = StyleSheet.create({});
