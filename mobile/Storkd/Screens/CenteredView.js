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

class CenteredView extends Component {

  render() {
    return (
        <View style={[styles.centered, this.props.style || {}]}>
          {this.props.children}
        </View>
    );
  }
}

const styles = StyleSheet.create({

    centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 40
    }
});


module.exports = CenteredView
