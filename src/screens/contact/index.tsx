import React from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box } from '@lamia/utils/theme';
import MenuItem from '../../components/shared/menu-item';
import { menuData } from './data';

type Props = {};

const ContactScreen = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Box flex={1} bg="white">
      {menuData.map((item, index) => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          hasRightArrow={false}
          onPress={() => {
            if (item.routeName != '') {
              navigation.navigate(item.routeName, item.routeData);
            }
          }}
        />
      ))}
    </Box>
  );
};

export default ContactScreen;
