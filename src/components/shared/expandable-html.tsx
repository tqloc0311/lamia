import { Pressable } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from './custom-image';
import { Images } from '@lamia/utils/images';
import RenderHtml from 'react-native-render-html';

interface ExpandableHtmlProps {
  html: string;
  expanded: boolean;
  toggleExpanded: () => void;
  minHeight: number;
  width: number;
}

const ExpandableHtml = (props: ExpandableHtmlProps) => {
  return (
    <Box>
      <Box height={props.expanded ? 'auto' : props.minHeight} overflow="hidden">
        <RenderHtml contentWidth={props.width} source={{ html: props.html }} />
      </Box>
      <Pressable onPress={props.toggleExpanded} hitSlop={4}>
        <Box flexDirection="row" alignItems="center" my="2">
          <Box height={1} bg="gray6" flex={1} />
          <Box flexDirection="row" alignItems="center" mx="4">
            <Text fontSize={14} fontWeight="500" mr="2">
              {props.expanded ? 'Thu gọn' : 'Xem thêm'}
            </Text>
            <CImage
              size={8}
              source={props.expanded ? Images.arrowUp : Images.arrowDown}
            />
          </Box>
          <Box height={1} bg="gray6" flex={1} />
        </Box>
      </Pressable>
    </Box>
  );
};

export default ExpandableHtml;
