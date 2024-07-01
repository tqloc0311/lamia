import React from 'react';
import { Images } from '../../utils/images';
import CImage from './custom-image';
import Layout from '@lamia/constants/Layout';
import { Colors } from '@lamia/utils/theme/colors';

interface HeaderLogoProps {
  color?: keyof typeof Colors;
}

const HeaderLogo = (props: HeaderLogoProps) => {
  const color = props.color ?? 'primary';
  return (
    <CImage
      resizeMode="contain"
      width={Layout.window.width * 0.4}
      height={24}
      source={Images.headerLogo}
      color={color}
    />
  );
};

export default HeaderLogo;
