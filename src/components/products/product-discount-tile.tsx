import { Box, Text } from '@lamia/utils/theme';
import { Pressable } from 'react-native';

const ProductDiscountTile = () => {
  return (
    <Pressable
      onPress={() => {
        // ..
      }}>
      <Box
        py="1.5"
        px="3"
        borderRadius="rounded32"
        borderWidth={1}
        borderColor="blue">
        <Text>Giảm giá 99%</Text>
      </Box>
    </Pressable>
  );
};

export default ProductDiscountTile;
