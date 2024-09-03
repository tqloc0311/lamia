import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

const timeout = (ms: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, ms));
};

export const sleep = async (interval: number) => {
  await timeout(interval);
};

export const isValidPhoneNumber = (phoneNumber: string) => {
  const regex = /^\d{10,12}$/;
  if (phoneNumber.match(regex)) {
    return true;
  }
  return false;
};

export const isValidEmail = (email: string): boolean => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  if (password.includes(' ')) return false;
  return true;
};

export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const randomInArray = (array: any[] | string) => {
  if (array.length > 0) {
    return array[randomNumber(0, array.length - 1)];
  }

  return null;
};

export const randomAlphabetString = (size: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < size; i += 1) {
    const char = randomInArray(characters);
    result += char;
  }

  return result;
};

export const randomNumericString = (size: number) => {
  let result = '';
  const characters = '0123456789';

  for (let i = 0; i < size; i += 1) {
    const char = randomInArray(characters);
    result += char;
  }

  return result;
};

export const moneyFormat = (x: number | undefined | null) => {
  if (x === undefined || x === null) {
    return '';
  }

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const chunk = (array: any[], size: number) =>
  Array.from({ length: Math.ceil(array.length / size) }, (value, index) =>
    array.slice(index * size, index * size + size),
  );

export const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

type StyleProps =
  | StyleProp<ViewStyle>
  | StyleProp<TextStyle>
  | StyleProp<ImageStyle>;

export function combineStyles(...styles: Array<StyleProps>): StyleProps {
  let combinedStyle: StyleProps = {};

  styles.forEach(style => {
    if (Array.isArray(style)) {
      style.forEach(_style => {
        combinedStyle = { ...(combinedStyle as object), ...(_style as object) };
      });
    } else {
      combinedStyle = { ...(combinedStyle as object), ...(style as object) };
    }
  });

  return combinedStyle;
}

export function fillArrayToFour(arr: any[]): any[] {
  const remainder = arr.length % 4;
  if (remainder !== 0) {
    const toAdd = 4 - remainder;
    arr = [...arr, ...new Array(toAdd).fill(undefined)];
  }
  return arr;
}
