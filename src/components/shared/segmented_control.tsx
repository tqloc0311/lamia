import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';

interface SegmentedControlProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const SegmentedControl = (props: SegmentedControlProps) => {
  return (
    <Box flexDirection="row" borderBottomColor="gray6" borderBottomWidth={1}>
      {props.items.map((item, index) => (
        <Pressable
          style={styles.pressable}
          onPress={() => props.onSelect(index)}>
          <Box
            pb="4"
            borderBottomWidth={props.selectedIndex == index ? 2 : 0}
            borderBottomColor="primary">
            <Text
              fontSize={14}
              fontWeight="700"
              color={props.selectedIndex == index ? 'primary' : 'gray6'}>
              {item}
            </Text>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});
