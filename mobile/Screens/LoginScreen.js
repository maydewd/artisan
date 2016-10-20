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
  TextInput,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome';
styles = require('../Styles/Layouts');
import {getScreenWidth, getScreenHeight, usablePercent} from '../helpers/dimension'

class LoginScreen extends Component {

    componentDidMount() {
        console.log(getScreenWidth());
        console.log(getScreenHeight());
        this.setState({username: 'devuser'});
        this.setState({password: 'securetest'});
    }

  render() {
    return (
      <View style={styles.loginScreenView}>
        <Image source = {require("../resources/Logo1.png")} style = {styles.logo} />
        <Icon.Button name="facebook" backgroundColor="#3b5998" width = {180} onPress={() => this._loginPressed()}>
            Login with Facebook
        </Icon.Button>
        <View style = {styles.groupedTextBoxes}>
          <TextInput
            style={styles.textBox}
            placeholder="Username"
            onChangeText={(username) => this.setState({username})}
          />
          <View style = {{height:5}}/>
          <TextInput
            style={styles.textBox}
            placeholder="Password"
            password = {true}
            secureTextEntry = {true}
            onChangeText={(password) => this.setState({password})}
          />
          <Button
            containerStyle={{padding:10, height:usablePercent(20), overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
            style={[styles.baseText, {fontSize: 20, color: 'pink'}]}
            onPress={() => this._submitLogin()}>
            Login
          </Button>
        </View>
        <Text style={[styles.baseText, styles.instructions]}>
          Sign Up
        </Text>
      </View>
    );
  }

  _loginPressed() {
    const { username, password } = this.state
    console.log(username);
    console.log(password);
    if (this._authenticated()) {}
      var navigator = this.props.navigator;
      navigator.replace({
          id: 'mainView'
      });
  }

  //Not functional
  _submitLogin() {
    const { username, password } = this.state

    console.log(username);
    console.log(password);
    //Username and password reach this point
    fetch("http://colab-sbx-137.oit.duke.edu:3000/api/login",
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})})
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if (responseData.success === true) {
        AsyncStorage.setItem('jwtToken', responseData.token, () =>
          this.props.navigator.push({id:'mainView'})
        );
      }
       return responseData;
     })
    .catch(function(err) {
      console.log("Error in Login Fetch request");
      console.log(err);
    })
    .done();
  }


  //placeholder
  _authenticated() {
    return true;
  }
}

module.exports = LoginScreen
