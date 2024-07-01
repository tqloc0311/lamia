import React, { useState } from 'react';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
import { Box, Text } from '@lamia/utils/theme';
import CIcon from '../shared/custom-icon';
import { Images } from '@lamia/utils/images';
import Layout from '@lamia/constants/Layout';
import SafeAreaWrapper from '../shared/safe-area-wrapper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useHeaderHeight } from '@react-navigation/elements';
import CButton from '../shared/custom-button';
import ProductColorPicker from './product-color-picker';
import SizePicker from '../product-detail/size-picker';
import { dummySizeArray } from '@lamia/utils/types';
import { Colors } from '@lamia/utils/theme/colors';
import { moneyFormat } from '@lamia/utils/helpers';
import { StyleSheet } from 'react-native';

interface ProductFilterProps {
  isVisible: boolean;
  dismiss: () => void;
}

const ProductFilter = (props: ProductFilterProps) => {
  const headerHeight = useHeaderHeight();
  const [multiSliderValue, setMultiSliderValue] = useState([0, 300]);

  const multiSliderValuesChange = (values: number[]) =>
    setMultiSliderValue(values);

  const renderCaption = (title: string) => {
    return (
      <Box
        my="3"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text fontWeight="500" fontSize={14} color="gray2">
          {title}
        </Text>
        <Box width={14} height={1} bg="gray2" />
      </Box>
    );
  };

  return (
    <Modal
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        paddingTop: Platform.OS === 'android' ? 34 : headerHeight - 22,
      }}
      isVisible={props.isVisible}
      hasBackdrop={false}
      animationIn="fadeInDown"
      animationOut="bounceOutUp"
      animationInTiming={200}
      animationOutTiming={10}>
      <SafeAreaWrapper style={styles.safeArea}>
        <Box
          position="absolute"
          top={0}
          left={-2}
          bottom={-100}
          width={Layout.window.width + 4}
          bg="semiTransparentBlack"
        />
        <Box bg="white" overflow="hidden" style={styles.container}>
          <Box
            bg="white"
            height={42}
            px="4"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.05}
            shadowRadius={5}
            elevation={1}>
            <Text>Bộ lọc</Text>
            <CIcon image={Images.closeRed} size={16} onPress={props.dismiss} />
          </Box>

          <Box px="4" py="1">
            {renderCaption('Màu sắc')}

            <ProductColorPicker didSelect={() => {}} />

            {renderCaption('Kích cỡ')}

            <SizePicker sizes={dummySizeArray} selectedId={1} />

            {renderCaption('Khoảng giá')}

            <MultiSlider
              containerStyle={styles.sliderContainer}
              markerStyle={styles.sliderMarker}
              isMarkersSeparated
              selectedStyle={{
                backgroundColor: Colors.primary,
              }}
              trackStyle={styles.sliderTrack}
              //   touchDimensions={{
              //     height: 40,
              //     width: 40,
              //     borderRadius: 20,
              //     slipDisplacement: 40,
              //   }}
              values={[multiSliderValue[0], multiSliderValue[1]]}
              sliderLength={Layout.window.width - 44}
              onValuesChange={multiSliderValuesChange}
              min={0}
              max={300}
              step={10}
              allowOverlap={false}
              minMarkerOverlapDistance={1}
            />

            <Box flexDirection="row" justifyContent="space-between">
              <Text>{moneyFormat(multiSliderValue[0] * 10000) + 'đ'}</Text>
              <Text>{moneyFormat(multiSliderValue[1] * 10000) + 'đ'}</Text>
            </Box>
          </Box>
          <Box
            bg="white"
            p="3"
            flexDirection="row"
            justifyContent="center"
            shadowColor="black"
            shadowOffset={{ width: 0, height: -4 }}
            shadowOpacity={0.05}
            shadowRadius={4}
            elevation={3}>
            <CButton outline justifyContent="center" onPress={() => {}}>
              Xóa lọc
            </CButton>
            <Box width={12} />
            <CButton filled justifyContent="center" onPress={() => {}}>
              Xem kết quả
            </CButton>
          </Box>
        </Box>
      </SafeAreaWrapper>
    </Modal>
  );
};

export default ProductFilter;

const styles = StyleSheet.create({
  sliderTrack: {
    backgroundColor: '#CECECE',
  },
  sliderMarker: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  sliderContainer: {
    marginLeft: 12,
  },
  container: {
    marginHorizontal: -2,
  },
  safeArea: {
    marginHorizontal: -20,
  },
});
