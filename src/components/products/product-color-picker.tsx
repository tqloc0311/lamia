import { Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Box } from '@lamia/utils/theme';

interface ProductColorPickerProps {
  didSelect: () => void;
}
const ProductColorPicker = (_: ProductColorPickerProps) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6'];

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Box flexDirection="row" gap="2">
        {colors.map(color => (
          <Pressable key={color} onPress={() => setSelectedColor(color)}>
            <Box
              width={18}
              height={18}
              borderRadius="rounded20"
              borderWidth={selectedColor === color ? 1 : 0}
              borderColor="primary"
              style={{ backgroundColor: color }}
            />
          </Pressable>
        ))}
      </Box>
    </ScrollView>
  );
};

export default ProductColorPicker;
