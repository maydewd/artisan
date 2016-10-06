/**
 * MyBundle
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
var NavigationBar = require('react-native-navbar');

class MyBundle extends Component {

  render() {
    var titleConfig = {
     title: 'MyBundle',
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

module.exports = MyBundle
