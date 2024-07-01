import { Linking, Pressable } from 'react-native';
import React from 'react';
import { Box, Text } from '@lamia/utils/theme';
import CImage from './custom-image';

interface HyperLinkProps {
  image?: any;
  title: string;
  url?: string;
}

const HyperLink = (props: HyperLinkProps) => {
  return (
    <Pressable
      onPress={() => {
        if (props.url) {
          Linking.openURL(props.url).catch(error =>
            console.error(error.message),
          );
        }
      }}>
      <Box flexDirection="row" alignItems="center">
        {props.image && (
          <CImage color="blurDark1" source={props.image} size={24} mr="2" />
        )}
        <Text
          textDecorationStyle="solid"
          textDecorationLine="underline"
          color="blurDark1">
          {props.title}
        </Text>
      </Box>
    </Pressable>
  );
};

export default HyperLink;
