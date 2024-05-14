import { Box, Text } from '@lamia/utils/theme';
import { Colors } from '@lamia/utils/theme/colors';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Pressable, TouchableOpacity } from 'react-native';

const OrderManagementTabBar = (props: MaterialTopTabBarProps) => {
  const { state, descriptors, navigation, position } = props;

  return (
    <Box flexDirection="row" bg="white" gap="1" px="1">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const activeColor = Colors.primary;
        const inactiveColor = Colors.gray5;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{}}>
            <Box px="2" py="2.5" justifyContent="center" alignItems="center">
              <Text
                color={isFocused ? 'primary' : 'gray5'}
                fontWeight="400"
                lineHeight={19}
                fontSize={12}>
                {label}
              </Text>

              <Box
                bg={isFocused ? 'primary' : 'transparent'}
                height={3}
                width="100%"
                borderRadius="rounded"
                position="absolute"
                bottom={-1.5}
              />
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
};

export default OrderManagementTabBar;
