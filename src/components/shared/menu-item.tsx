import React from 'react';
import { Pressable } from 'react-native';
import CIcon from './custom-icon.tsx';
import { Images } from '../../utils/images.ts';

import { Box, Text, Theme } from '@lamia/utils/theme';
import {
  ColorProps,
  color,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';

interface MenuItemExtendProps {
  icon?: any;
  title: string;
  secondary?: string;
  hasRightArrow?: boolean;
  onPress?: () => void;
  appendingTitle?: React.ReactNode;
}

type RestyleProps = ColorProps<Theme>;

interface MenuItemProps extends MenuItemExtendProps, RestyleProps {}

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([color]);

const MenuItem = (_props: MenuItemProps) => {
  const restyleProps: Omit<MenuItemProps, keyof MenuItemExtendProps> = {
    ..._props,
  };

  const props: MenuItemProps = {
    ..._props,
    ...useRestyle(restyleFunctions, restyleProps),
  };

  const color = props.color ?? 'primary';
  const hasRightArrow = props.hasRightArrow ?? true;

  return (
    <Pressable disabled={!props.onPress} onPress={props.onPress}>
      <Box>
        <Box flexDirection="row" alignItems="center" py="2" px="4">
          <CIcon color={color} image={props.icon} />

          <Box ml="3" flex={1}>
            <Box flexDirection="row" alignItems="center">
              <Text color={color} my="2">
                {props.title}
              </Text>
              {props.appendingTitle && props.appendingTitle}
            </Box>
            {props.secondary && (
              <Box flex={1}>
                <Text mx="2" color={color}>
                  {props.secondary}
                </Text>
              </Box>
            )}
          </Box>

          {hasRightArrow && (
            <CIcon image={Images.arrowRight} size={12} color="primary" />
          )}
        </Box>
        <Box bg="gray8" height={1} />
      </Box>
    </Pressable>
  );
};

export default MenuItem;
