import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import { Size } from '@lamia/utils/types';
import CImage from '../shared/custom-image';
import { Images } from '@lamia/utils/images';

interface SizePickerProps {
  sizes: Size[];
  selectedId: number;
  onSelect?: (size: Size) => void;
}

const SizePicker = (props: SizePickerProps) => {
  const [selectedId, setSelectedId] = useState<number>(props.selectedId);

  const renderItem = (info: ListRenderItemInfo<Size>) => {
    const size = info.item;

    return (
      <Pressable
        disabled={size.disabled}
        onPress={() => {
          props.onSelect && props.onSelect(size);
          setSelectedId(size.id);
        }}>
        <Box
          height={30}
          width={30}
          mr="1.5"
          aspectRatio={1}
          borderWidth={1}
          borderColor={selectedId === size.id ? 'primary' : 'gray6'}
          bg={!size.disabled ? 'white' : 'gray9'}
          justifyContent="center"
          alignItems="center">
          <Text
            color={selectedId === size.id ? 'primary' : 'gray5'}
            fontSize={12}>
            {size.title}
          </Text>

          {size.disabled && (
            <Box position="absolute" top={0} right={0} bottom={0} left={0}>
              <CImage source={Images.dashedCross} />
            </Box>
          )}
        </Box>
      </Pressable>
    );
  };

  return (
    <Box>
      <FlatList
        style={styles.list}
        horizontal
        data={props.sizes}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default SizePicker;

const styles = StyleSheet.create({
  list: {},
});
