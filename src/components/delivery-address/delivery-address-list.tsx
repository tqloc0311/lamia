import React, { useState } from 'react';
import { Box, Text } from '@lamia/utils/theme';
import DeliveryAddressItem from '@lamia/components/delivery-address/delivery-address-item';
import { FlatList, ListRenderItemInfo, Pressable } from 'react-native';
import CImage from '@lamia/components/shared/custom-image';
import { Images } from '@lamia/utils/images';
import { NativeStackNavigationBaseType } from '@lamia/navigation/types';
import { useNavigation } from '@react-navigation/native';

interface DeliveryAddressListProps {}

const data = [...Array(10)].map((_, i) => i + 1);

const DeliveryAddressList = (props: DeliveryAddressListProps) => {
  const navigation = useNavigation<NativeStackNavigationBaseType>();
  const [selectedId, setSelectedId] = useState(1);
  let defaultId = 1;

  const renderItem = (data: ListRenderItemInfo<number>) => {
    return (
      <DeliveryAddressItem
        onSelect={() => setSelectedId(data.item)}
        onEdit={() =>
          navigation.navigate('EditDeliveryAddress', { address: data.item })
        }
        selected={selectedId == data.item}
        default={defaultId == data.item}
      />
    );
  };

  const renderHeader = () => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('EditDeliveryAddress');
        }}>
        <Box borderBottomColor="gray8" borderBottomWidth={1}>
          <Box
            borderStyle="dashed"
            borderWidth={1}
            borderColor="blurDark1"
            my="4"
            mx="3"
            p="3"
            bg="blueLight1"
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <CImage source={Images.plus} size={20} />
            <Text ml="2" color="blurDark1" fontSize={14} fontWeight="500">
              Thêm địa chỉ mới
            </Text>
          </Box>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box flex={1}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        ListHeaderComponent={renderHeader}
      />
    </Box>
  );
};

export default DeliveryAddressList;
