import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from './custom-image';
import { Images } from '@lamia/utils/images';

interface ExpandableTextProps {
  text: string;
  expanded: boolean;
  toggleExpanded: () => void;
  minHeight: number;
}

const ExpandableText = (props: ExpandableTextProps) => {
  return (
    <Box>
      <Box height={props.expanded ? 'auto' : props.minHeight}>
        <Text fontSize={14} color="gray3" lineHeight={22}>
          {props.text}
        </Text>
      </Box>
      <Pressable onPress={props.toggleExpanded}>
        <Box flexDirection="row" alignItems="center" mt="4">
          <Box height={1} bg="gray6" flex={1} />
          <Box flexDirection="row" alignItems="center" mx="4">
            <Text fontSize={14} fontWeight="500">
              {props.expanded ? 'Thu gọn' : 'Xem thêm'}
            </Text>
            <CImage
              size={8}
              source={props.expanded ? Images.arrowUp : Images.arrowDown}
              ml="3"
            />
          </Box>
          <Box height={1} bg="gray6" flex={1} />
        </Box>
      </Pressable>
    </Box>
  );
};

export default ExpandableText;

const styles = StyleSheet.create({});
