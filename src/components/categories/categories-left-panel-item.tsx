import { Pressable, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import React from 'react';
import Category from '../../models/category';

import { Images } from '../../utils/images';
import CImage from '../shared/custom-image';
import { Box, Text } from '@lamia/utils/theme';

import { Colors } from '@lamia/utils/theme/colors';

interface CategoriesLeftPanelItemProps extends ViewProps {
  category: Category;
  isSelected: boolean;
  onPress?: (category: Category) => void;
}

const CategoriesLeftPanelItem = (props: CategoriesLeftPanelItemProps) => {
  const contentStyle: ViewStyle = {
    ...styles.content,
  };

  return (
    <Pressable onPress={() => props.onPress && props.onPress(props.category)}>
      <Box
        flex={1}
        flexDirection="row"
        style={contentStyle}
        py="3"
        borderBottomColor="gray8"
        borderBottomWidth={1}
        bg={props.isSelected ? 'white' : 'gray9'}>
        <Box style={styles.leftIndicatorContainer}>
          {props.isSelected && <Box flex={1} style={styles.leftIndicator} />}
        </Box>

        <Box flex={1}>
          <Text
            fontSize={12}
            mr="1"
            ml="3"
            fontWeight={props.isSelected ? '700' : '500'}
            color={props.isSelected ? 'primary' : 'gray2'}>
            {props.category.name}
          </Text>
        </Box>

        {props.category.id === 19 && (
          <CImage source={Images.discount} style={styles.discount} />
        )}

        <Box style={styles.rightIndicatorContainer}>
          {props.isSelected && (
            <CImage
              source={Images.categoryIndicator}
              style={styles.rightIndicator}
            />
          )}
        </Box>
      </Box>
    </Pressable>
  );
};

export default CategoriesLeftPanelItem;

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  rightIndicatorContainer: {
    width: 6,
    height: 12,
    alignSelf: 'center',
    marginLeft: 4,
  },
  rightIndicator: {
    width: '100%',
    height: '100%',
  },
  leftIndicatorContainer: {
    width: 3,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  leftIndicator: {
    backgroundColor: Colors.primary,
  },
  discount: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
});
