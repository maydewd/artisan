/**
 * Messaging
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import {getScreenHeight, topNavBarHeight, getScreenWidth} from '../helpers/dimension'
import { SwipeListView } from 'react-native-swipe-list-view';
styles = require('../Styles/Layouts');
import Icon from 'react-native-vector-icons/FontAwesome';

class Messages extends Component {

  render() {
    var titleConfig = {
     title: 'Messages',
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
    this.props.navigator.pop()
  }

}

module.exports = Messages
