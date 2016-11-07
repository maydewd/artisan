import {
  Dimensions,
  Platform,
} from 'react-native';

const NavBarTopHeight = 45;
const NavBarBottomHeight = 50;
const topPadding = 20;

export function topNavBarHeight() {
  return NavBarTopHeight;
}

export function bottomNavBarHeight() {
  return NavBarBottomHeight;
}

export function getScreenWidth() {
  return Dimensions.get('window').width;
}

export function getScreenHeight() {
  return Dimensions.get('window').height;
}

export function getUsableScreenHeight() {
  if (Platform.OS === 'ios') {
    return (getScreenHeight()-bottomNavBarHeight()-topNavBarHeight() - topPadding);
  }
  else {
    return (getScreenHeight()-bottomNavBarHeight()-topNavBarHeight());
  }
}

export function usablePercent(perc) {
  return getUsableScreenHeight() * perc/100;
}

export function usableWithTop() {
  if (Platform.OS === 'ios') {
    return (getScreenHeight() - topNavBarHeight - topPadding);
  }
  else {
    return (getScreenHeight() - topNavBarHeight);
  }
}
