/**
 * Deprecated
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'react-native-button'

class BottomNav extends Component {

  render() {
    return (
      <View style = {styles.row}>
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{fontSize: 20, color: 'blue'}}
          onPress={() => this._toDiscover()}>
          Discover
      </Button>
      <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        style={{fontSize: 20, color: 'blue'}}
        onPress={() => this._toStorkFront()}>
        StorkFront
    </Button>
      </View>
    );
  }

  _toDiscover() {
    console.log("trying to log in")
    var navigator = this.props.navigator;
    navigator.replace({
        id: 'discover'
    });
  }

  _toStorkFront() {
    console.log("trying to log in")
    var navigator = this.props.navigator;
    navigator.replace({
        id: 'storkFront'
    });
  }
}

const styles = StyleSheet.create({

    centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 40
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-around",
      maxHeight: 40
    }


});


module.exports = BottomNav
