import { FlatList, StyleSheet, ViewProps } from 'react-native';
import React from 'react';
import SubCategory from '../../models/sub-category';

import CategoriesRightPanelItem from './categories-right-panel-item';
import { Box } from '@lamia/utils/theme';

interface CategoriesRightPanelProps extends ViewProps {
  subCategories: SubCategory[];
}

const CategoriesRightPanel = (props: CategoriesRightPanelProps) => {
  return (
    <Box flex={1}>
      <FlatList
        data={props.subCategories}
        keyExtractor={data => data.id.toString()}
        renderItem={data => (
          <CategoriesRightPanelItem subCategory={data.item} />
        )}
        numColumns={3}
      />
    </Box>
  );
};

export default CategoriesRightPanel;

const styles = StyleSheet.create({});
