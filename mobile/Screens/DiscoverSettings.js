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
import Icon from 'react-native-vector-icons/FontAwesome';

class DiscoverSettings extends Component {

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <Icon name="save" size={25}/>
      </View>
    )
  }

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
      rightButton={this.rightButton()}
      />
    );
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = DiscoverSettings
