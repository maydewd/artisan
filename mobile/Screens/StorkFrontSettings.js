/**
 * Discover Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Switch
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Icon from 'react-native-vector-icons/FontAwesome';
import { SegmentedControls } from 'react-native-radio-buttons';

class StorkFrontSettings extends Component {

  render() {
    var titleConfig = {
     title: 'Profile Settings',
   };

   const leftButtonConfig = {
    title: 'Back',
    handler: () => {this.pop()}
  };

    return (

      <View>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={leftButtonConfig}
        />
      </View>
    );
  }

  pop() {
    this.props.navigator.pop();
  }
}

module.exports = StorkFrontSettings
