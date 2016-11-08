import {
  Dimensions,
  Platform,
  StatusBar,
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

export function getUsableScreenHeight() {
  if (Platform.OS === 'android') {
    return (Dimensions.get('window').height - bottomNavBarHeight() - topNavBarHeight() - StatusBar.currentHeight);
  } else {
    return (Dimensions.get('window').height-bottomNavBarHeight()-topNavBarHeight() - topPadding);
  }
}

export function getScreenWidth() {
  return Dimensions.get('window').width;
}

export function getScreenHeight() {
  if (Platform.OS === 'android') {
    return (Dimensions.get('window').height - StatusBar.currentHeight);
  } else {
    return Dimensions.get('window').height;
  }
}

export function usablePercent(perc) {
  return getUsableScreenHeight() * perc/100;
}

export function usableWithTop() {
  if (Platform.OS === 'android') {
    return (getScreenHeight() - topNavBarHeight());
  } else {
    return (getScreenHeight() - topNavBarHeight() - topPadding);
  }
}
