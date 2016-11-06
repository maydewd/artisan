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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
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
        <Image source = {require("../resources/storkdLogo.png")} style = {styles.logo} />
        <Icon.Button name="facebook" backgroundColor="#3b5998" width = {180} onPress={() => this._loginPressed()}>
            Login with Facebook
        </Icon.Button>
        <View style = {{alignItems: 'center'}}>
          <Kohana
            style={{width: getScreenWidth() * .9, backgroundColor: 'white', borderTopRightRadius:10, borderTopLeftRadius:10 }}
            onChangeText={(username) => this.setState({username})}
            label={'Username'}
            iconClass={MaterialIcons}
            iconName={'perm-identity'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: 'pink' }}
            autoCorrect={false}
          />
          <Kohana
            style={{ width: getScreenWidth() * .9, backgroundColor: 'white', borderBottomRightRadius:10, borderBottomLeftRadius:10}}
            onChangeText={(password) => this.setState({password})}
            label={'Password'}
            iconClass={MaterialIcons}
            iconName={'lock'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: 'pink' }}
            password = {true}
            secureTextEntry = {true}
          />
          <View style = {{height: 10}} />
          <Button
            containerStyle={{paddingTop: 7, width: 110, height:40, overflow:'hidden', borderRadius:4, backgroundColor: 'pink'}}
            style={[styles.baseText, {fontSize: 20, color: 'white'}]}
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
      } else {
        alert('Incorrect username and password')
      }
       return responseData;
     })
    .catch(function(err) {
      console.log("Error in Login Fetch request");
      console.log(err);
        alert('Something went wrong')
    })
    .done();
  }


  //placeholder
  _authenticated() {
    return true;
  }
}

module.exports = LoginScreen
