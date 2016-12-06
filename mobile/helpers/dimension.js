/**
 * Provided for easy access to screen dimensions
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
 */

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

//Usable screen height accounting for top and bottom navigation bars
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

//Returns height of screen based on percentage given (perc)
export function usablePercent(perc) {
  return getUsableScreenHeight() * perc/100;
}

//Usable height accounting for top nav bar
export function usableWithTop() {
  if (Platform.OS === 'android') {
    return (getScreenHeight() - topNavBarHeight());
  } else {
    return (getScreenHeight() - topNavBarHeight() - topPadding);
  }
}
