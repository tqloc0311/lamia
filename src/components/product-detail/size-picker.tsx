import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import ProductAttribute from '@lamia/models/product-attribute';

interface SizePickerProps {
  attributes: ProductAttribute[];
  selectedId: number;
  onSelect?: (attribute: ProductAttribute) => void;
}

const SizePicker = (props: SizePickerProps) => {
  const [selectedId, setSelectedId] = useState<number>(props.selectedId);

  const renderItem = (info: ListRenderItemInfo<ProductAttribute>) => {
    const attribute = info.item;

    return (
      <Pressable
        // disabled={attribute.disabled}
        onPress={() => {
          props.onSelect && props.onSelect(attribute);
          setSelectedId(attribute.id);
        }}>
        <Box
          height={30}
          width={30}
          mr="1.5"
          aspectRatio={1}
          borderWidth={1}
          borderColor={selectedId === attribute.id ? 'primary' : 'gray6'}
          // bg={!attribute.disabled ? 'white' : 'gray9'}
          justifyContent="center"
          alignItems="center">
          <Text
            color={selectedId === attribute.id ? 'primary' : 'gray5'}
            fontSize={12}>
            {attribute.title}
          </Text>

          {/* {attribute.disabled && (
            <Box position="absolute" top={0} right={0} bottom={0} left={0}>
              <CImage source={Images.dashedCross} />
            </Box>
          )} */}
        </Box>
      </Pressable>
    );
  };

  return (
    <Box>
      <FlatList
        style={styles.list}
        horizontal
        data={props.attributes}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default SizePicker;

const styles = StyleSheet.create({
  list: {},
});
