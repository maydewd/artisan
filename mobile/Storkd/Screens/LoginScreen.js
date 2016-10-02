/**
 * Login Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import CenteredView from '../Screens/CenteredView'
import Button from 'react-native-button'
styles = require('../Styles/Layouts');

class LoginScreen extends Component {

  render() {
    return (
      <CenteredView>
        <Image source = {require("../resources/Logo1.png")} style = {styles.logo} />
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{fontSize: 20, color: 'blue'}}>
          Facebook
        </Button>
        <View style = {styles.groupedTextBoxes}>
          <TextInput
            style={styles.textBox}
            placeholder="Username"
          />
          <TextInput
            style={styles.textBox}
            placeholder="Password"
            password = {true}
          />
          <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
            style={{fontSize: 20, color: 'pink'}}
            onPress={() => this._loginPressed()}>
            Login
          </Button>
        </View>
        <Text style={styles.instructions}>
          Sign Up
        </Text>
      </CenteredView>
    );
  }

  _loginPressed() {
    console.log("trying to log in")
    if (this._authenticated()) {}
      var navigator = this.props.navigator;
      navigator.replace({
          id: 'mainView'
      });
  }


  //placeholder
  _authenticated() {
    return true;
  }
}

module.exports = LoginScreen
