import { Platform, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { Box, Text } from '@lamia/utils/theme';
import CIcon from '../shared/custom-icon';
import { Images } from '@lamia/utils/images';
import Layout from '@lamia/constants/Layout';
import SafeAreaWrapper from '../shared/safe-area-wrapper';
import CImage from '../shared/custom-image';
import { useHeaderHeight } from '@react-navigation/elements';
import { Colors } from '@lamia/utils/theme/colors';

interface ProductSortProps {
  isVisible: boolean;
  dismiss: () => void;
  selectedId: number;
  didSelect: (id: number) => void;
}

interface SortItem {
  id: number;
  title: string;
}

const ProductSort = (props: ProductSortProps) => {
  const headerHeight = useHeaderHeight();

  const renderItem = (item: SortItem) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => {
          props.didSelect(item.id);
        }}>
        <Box my="2" flexDirection="row" gap="2">
          <CImage
            source={
              props.selectedId === item.id
                ? Images.radioActive
                : Images.radioInactive
            }
            size={16}
          />
          <Text fontSize={14} fontWeight="400" color="gray3">
            {item.title}
          </Text>
        </Box>
      </Pressable>
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
            <Text>Sắp xếp theo</Text>
            <CIcon image={Images.closeRed} size={16} onPress={props.dismiss} />
          </Box>

          <Box px="2" py="1">
            {sortItems.map(item => renderItem(item))}
          </Box>
        </Box>
      </SafeAreaWrapper>
    </Modal>
  );
};

export default ProductSort;

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

const sortItems: SortItem[] = [
  {
    id: 1,
    title: 'Mặc định',
  },
  {
    id: 2,
    title: 'Mới nhất',
  },
  {
    id: 3,
    title: 'Cũ nhất',
  },
  {
    id: 4,
    title: 'Giá thấp tới cao',
  },
  {
    id: 5,
    title: 'Giá cao tới thấp',
  },
  {
    id: 6,
    title: 'Được yêu thích nhất',
  },
  {
    id: 7,
    title: 'Được mua nhiều nhất',
  },
];
