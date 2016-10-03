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
styles = require('../Styles/Layouts');

class StorkFront extends Component {

  render() {
    return (
      <View style = {styles.centered}>
        <Text> StorkFront </Text>
      </View>
    );
  }
}

module.exports = StorkFront
