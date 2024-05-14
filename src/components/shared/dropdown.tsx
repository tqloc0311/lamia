import { Platform, Pressable, StyleSheet } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { Box, Text, Theme } from '@lamia/utils/theme';
import CImage from './custom-image';
import { Images } from '@lamia/utils/images';
import { BoxProps } from '@shopify/restyle';

interface DropdownProps extends BoxProps<Theme> {
  data: any[];
  initialIndex?: number;
  titleKey: string;
  placeholder: string;
  numOfVisibleRow?: number;
  onSelect?: (item: any) => void;
}

const DEFAULT_ROW_HEIGHT = 40;

const Dropdown = (props: DropdownProps, ref: any) => {
  const [selectedItem, setSelectedItem] = useState<any>(
    props.initialIndex !== undefined ? props.data.at(props.initialIndex) : null,
  );

  useImperativeHandle(ref, () => ({
    clearSelected: () => {
      setSelectedItem(null);
    },
  }));

  return (
    <ModalDropdown
      shouldRasterizeIOS={false}
      dropdownStyle={styles.dropdown}
      options={props.data}
      isFullWidth
      onSelect={(index, option) => {
        setSelectedItem(option);
        props.onSelect && props.onSelect(option);
      }}
      saveScrollPosition={false}
      renderRowComponent={Pressable}
      renderRow={(option, index, isSelected) => {
        return (
          <Box height={DEFAULT_ROW_HEIGHT} px="5" justifyContent="center">
            <Text>{option[props.titleKey]}</Text>
          </Box>
        );
      }}
      adjustFrame={params => {
        const numOfVisibleRow = props.numOfVisibleRow ?? 5;
        params.height =
          Math.min(numOfVisibleRow, props.data.length) * DEFAULT_ROW_HEIGHT;
        if (Platform.OS == 'android') {
          params.top = (params.top ?? 0) - 32;
        } else {
          params.top = (params.top ?? 0) + 4;
        }

        return params;
      }}>
      <Box>
        <Box
          alignItems="center"
          flexDirection="row"
          borderRadius="rounded4"
          borderWidth={1}
          borderColor="gray7"
          bg="white"
          px="2"
          py="2.5"
          {...props}>
          <Box flex={1}>
            <Text
              fontWeight="400"
              fontSize={14}
              color={selectedItem ? 'primary' : 'gray5'}>
              {selectedItem ? selectedItem[props.titleKey] : props.placeholder}
            </Text>
          </Box>
          <CImage source={Images.arrowDown} size={10} />
        </Box>
      </Box>
    </ModalDropdown>
  );
};

export default forwardRef(Dropdown);

const styles = StyleSheet.create({
  dropdown: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    marginTop: 4,
    elevation: 8,
    borderRadius: 5,
  },
});
