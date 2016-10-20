import {
  Dimensions,
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
  return (Dimensions.get('window').height-bottomNavBarHeight()-topNavBarHeight() - topPadding);
}

export function getScreenWidth() {
  return Dimensions.get('window').width;
}

export function getScreenHeight() {
  return Dimensions.get('window').height;
}

export function usablePercent(perc) {
  return getUsableScreenHeight() * perc/100;
}
