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

class StorkFront extends Component {

  render() {
    return (
      <View style = {styles.centered}>
        <Text> StorkFront </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

    centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 100
    }
});


module.exports = StorkFront
