import { Platform, Pressable, StyleSheet } from 'react-native';
import React, { forwardRef } from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { Box, Text, Theme } from '@lamia/utils/theme';
import CImage from './custom-image';
import { Images } from '@lamia/utils/images';
import { BoxProps } from '@shopify/restyle';

interface DropdownProps extends BoxProps<Theme> {
  data: any[];
  selectedItem?: any;
  titleKey: string;
  placeholder: string;
  numOfVisibleRow?: number;
  onSelect?: (item: any) => void;
  disabled?: boolean;
}

const DEFAULT_ROW_HEIGHT = 40;

const Dropdown = (props: DropdownProps, ref: any) => {
  return (
    <ModalDropdown
      ref={ref}
      disabled={props.disabled}
      shouldRasterizeIOS={false}
      dropdownStyle={styles.dropdown}
      options={props.data}
      isFullWidth
      onSelect={(index, option) => {
        props.onSelect && props.onSelect(option);
      }}
      saveScrollPosition={false}
      renderRowComponent={Pressable}
      renderRow={option => {
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
              color={props.selectedItem ? 'primary' : 'gray5'}>
              {props.selectedItem
                ? props.selectedItem[props.titleKey]
                : props.placeholder}
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
