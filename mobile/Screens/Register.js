/**
 * Register
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

class Register extends Component {

  render() {
    return (
      <View>
        <View style = {{height: 20}}/>
        <TouchableOpacity onPress={() => this._cancel()}>
          <Text> Back </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _cancel() {
    var navigator = this.props.navigator;
    navigator.pop();
  }

}

module.exports = Register
