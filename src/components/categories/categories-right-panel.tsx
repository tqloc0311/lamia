import { FlatList, StyleSheet, ViewProps } from 'react-native';
import React, { useMemo } from 'react';
import Category from '../../models/category';

import CategoriesRightPanelItem from './categories-right-panel-item';
import { Box, Text } from '@lamia/utils/theme';
import Empty from '../../assets/svgs/empty.svg';
import Layout from '@lamia/constants/Layout';
import { faker } from '@faker-js/faker';

interface CategoriesRightPanelProps extends ViewProps {
  categories: Category[];
}

const NUM_OF_COLUMNS = 3;

const CategoriesRightPanel = (props: CategoriesRightPanelProps) => {
  const filledCategories = useMemo(() => {
    const categoriesCopy: (Category | null)[] = [...props.categories];
    while (categoriesCopy.length % 3 !== 0) {
      categoriesCopy.push(null);
    }
    return categoriesCopy;
  }, [props.categories]);

  const renderEmptyView = () => {
    const size = Layout.window.width / 2;
    return (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <Empty width={size} height={(size / 3) * 2} />
        <Text color="gray5">No data</Text>
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <FlatList
        data={filledCategories}
        keyExtractor={data => data?.id.toString() ?? faker.string.uuid()}
        renderItem={data => <CategoriesRightPanelItem category={data.item} />}
        numColumns={NUM_OF_COLUMNS}
        ListEmptyComponent={renderEmptyView}
        contentContainerStyle={styles.contentContainer}
      />
    </Box>
  );
};

export default CategoriesRightPanel;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
  },
});
