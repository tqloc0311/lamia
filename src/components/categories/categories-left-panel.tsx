import { FlatList, ViewProps } from 'react-native';
import React, { useState } from 'react';
import Category from '../../models/category';
import CategoriesLeftPanelItem from './categories-left-panel-item';
import { Box } from '@lamia/utils/theme';

interface CategoriesLeftPanelProps extends ViewProps {
  categories: Category[];
  didSelectCategory: (category: Category | undefined) => void;
}

const CategoriesLeftPanel = (props: CategoriesLeftPanelProps) => {
  const [selectedItemId, setSelectedItemId] = useState(
    props.categories.at(0)?.id,
  );

  return (
    <Box {...props} bg="gray7">
      <FlatList
        data={props.categories}
        keyExtractor={data => data.id.toString()}
        extraData={selectedItemId}
        renderItem={data => (
          <CategoriesLeftPanelItem
            isSelected={selectedItemId === data.item.id}
            category={data.item}
            onPress={item => {
              setSelectedItemId(item.id);
              props.didSelectCategory(item);
            }}
          />
        )}
      />
    </Box>
  );
};

export default CategoriesLeftPanel;
