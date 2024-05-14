import { Pressable } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { Box, Text } from '@lamia/utils/theme';
import CIcon from '../shared/custom-icon';
import { Images } from '@lamia/utils/images';
import Layout from '@lamia/constants/Layout';
import SafeAreaWrapper from '../shared/safe-area-wrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CImage from '../shared/custom-image';
import { useHeaderHeight } from '@react-navigation/elements';

interface ProductSortProps {
  isVisible: boolean;
  dismiss: () => void;
}

interface SortItem {
  id: number;
  title: string;
}

const ProductSort = (props: ProductSortProps) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const renderItem = (item: SortItem) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => {
          // props.didSelect(item.id);
          props.dismiss();
        }}>
        <Box my="2" flexDirection="row">
          <CImage
            source={
              // props.selectedId == item.id
              //   ? Images.radioActive
              //   : Images.radioInactive
              Images.radioInactive
            }
            size={16}
            mr="4"
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
      style={{
        paddingTop: headerHeight - 22,
      }}
      isVisible={props.isVisible}
      hasBackdrop={false}
      animationIn="fadeInDown"
      animationOut="bounceOutUp"
      animationInTiming={200}
      animationOutTiming={10}>
      <SafeAreaWrapper style={{ marginHorizontal: -22 }}>
        <Box
          position="absolute"
          top={0}
          left={0}
          bottom={-insets.bottom}
          width={Layout.window.width + 1}
          bg="semiTransparentBlack"
        />
        <Box bg="white">
          <Box
            bg="white"
            height={42}
            px="3"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            shadowColor="black"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.05}
            shadowRadius={5}
            elevation={3}>
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
