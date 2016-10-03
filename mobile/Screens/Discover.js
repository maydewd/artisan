/**
 * Centered Screen
 * Used as a part Component for certain screens
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import MainNavBar from '../Components/MainNavBar'
styles = require('../Styles/Layouts');

class Discover extends Component {

  render() {
    return (
      <View style = {styles.centered}>
        <Text> Discover </Text>
      </View>
    );
  }
}

module.exports = Discover
