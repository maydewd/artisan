import {
  Dimensions,
} from 'react-native';

export function getScreenWidth() {
  return Dimensions.get('window').width;
}

export function getScreenHeight() {
  return Dimensions.get('window').height;
}
