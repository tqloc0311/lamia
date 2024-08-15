import { Images } from './images';
import { ThemeColor } from './theme';

export interface ProfileMenuItemType {
  icon: typeof Images;
  title: string;
  appendingTitle?: string;
  color?: ThemeColor;
  hasRightArrow?: boolean;
  onPress?: () => void;
}

export interface Size {
  id: number;
  title: string;
  disabled: boolean;
}

export const dummySizeArray: Size[] = [
  {
    id: 1,
    title: 'XS',
    disabled: false,
  },
  {
    id: 2,
    title: 'S',
    disabled: false,
  },
  {
    id: 3,
    title: 'M',
    disabled: false,
  },
  {
    id: 4,
    title: 'L',
    disabled: false,
  },
  {
    id: 5,
    title: 'XL',
    disabled: false,
  },
  {
    id: 6,
    title: 'XXL',
    disabled: false,
  },
];

export enum Gender {
  male = 0,
  female = 1,
  other = 2,
}
