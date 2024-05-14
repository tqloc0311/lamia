import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text, Theme } from '@lamia/utils/theme';
import { BoxProps } from '@shopify/restyle';
import CImage from './custom-image';
import { Images } from '@lamia/utils/images';
import Progress from './progress';

interface RatingProgressProps extends BoxProps<Theme> {
  leadingTitle?: string;
  value: number;
}
const RatingProgress = (props: RatingProgressProps) => {
  return (
    <Box {...props} flexDirection="row" alignItems="center">
      <Box width={16}>
        <Text>{props.leadingTitle}</Text>
      </Box>

      <CImage source={Images.star} size={16} mx="1" />

      <Progress flex={1} value={props.value} />

      <Box width={36}>
        <Text textAlign="right">
          {(props.value * 100).toFixed(0).toString() + '%'}
        </Text>
      </Box>
    </Box>
  );
};

export default RatingProgress;

const styles = StyleSheet.create({});
