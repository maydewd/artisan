/**
 * Discover Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var NavigationBar = require('react-native-navbar');

class DiscoverSettings extends Component {

  render() {
    var titleConfig = {
     title: 'Discover Settings',
   };

   const leftButtonConfig = {
    title: 'Back',
    handler: () => {this.pop()}
  };

    return (
      <NavigationBar
      style={styles.navBar}
      title={titleConfig}
      leftButton={leftButtonConfig}
      />
    );
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = DiscoverSettings
