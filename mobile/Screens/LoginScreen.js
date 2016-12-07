/**
 * Login Screen
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  Dimensions,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  Navigator,
  Alert
} from 'react-native';
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Kohana } from 'react-native-textinput-effects';
import {getScreenWidth, getScreenHeight, usablePercent} from '../helpers/dimension'
const config = require('../config/server');
import {async_keys} from '../resources/Properties.js';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
styles = require('../Styles/Layouts');

class LoginScreen extends Component {

  componentDidMount() {
        console.disableYellowBox = true;
        this.setState({username: null, password: null});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior = 'position'>
      <View style = {styles.topLoginView}>
        <Image source = {require("../resources/storkdLogo.png")}
          style = {styles.loginImage}
        />
        <FBLogin
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            permissions={["email","user_friends"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
             onLogin={(data) => this._loginWithFB(data)}
             onLogout={(data) => this._logoutWithFB(data)}
             onLoginFound={(data) => this._onLoginFound(data)}
             onLoginNotFound={(data) => this._onLoginFound(data)}
             onError={(data) => this._onError(data)}
             onCancel={(data) => _onCancel()}
             onPermissionsMissing={(data) => onPermissionsMissing(data)}/>
        <View style = {{alignItems: 'center'}}>
          <Kohana
            style={styles.loginTopTextField}
            onChangeText={(username) => this.setState({username})}
            label={'Username'}
            iconClass={MaterialIcons}
            iconName={'perm-identity'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: 'pink' }}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType = {'done'}
          />
          <Kohana
            style={styles.loginBottomTextField}
            onChangeText={(password) => this.setState({password})}
            label={'Password'}
            iconClass={MaterialIcons}
            iconName={'lock'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: 'pink' }}
            password = {true}
            secureTextEntry = {true}
            returnKeyType = {'done'}
          />
          <View style = {{height: 10}} />
          <Button
            containerStyle={styles.loginButton}
            style={[styles.baseText, {fontSize: 20, color: 'white'}]}
            onPress={() => this._submitLogin()}>
            Login
          </Button>
        </View>
        <TouchableOpacity   onPress={() => this._register()}>
          <Text style={[styles.baseText, styles.instructions]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => this._toAboutPage()}>
          <Text style={[styles.baseText]}>
            About Page
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    );
  }

  _register() {
    var navigator = this.props.navigator;
    navigator.push({
        id: 'register',
        sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump
    });
  }

  _toAboutPage() {
    var navigator = this.props.navigator;
    navigator.push({
        id: 'about',
        sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump
    });
  }

  _logoutWithFB(data) {
    //Currently nothing done
  }

  _onPermissionsMissing(data) {
    alert("Check permissions")
  }

  _onLoginFound(data) {
    //Currently nothing done
  }

  _onCancel(data) {
    //Currently nothing done
  }

  _onLoginNotFound(data) {
    //Currently nothing done
  }

  _loginWithFB(data) {
    fetch(config.url + config.fbLogin,
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access_token': data.credentials.token
        }
      })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success === true) {
        AsyncStorage.removeItem('bundlePosts')
        AsyncStorage.setItem(async_keys.USER, JSON.stringify(responseData.user));
        AsyncStorage.setItem(async_keys.TOKEN, responseData.token, () => this._toMainView());
      } else {
        alert('Invalid FB login')
      }
       return responseData;
     })
    .catch(function(err) {
      alert('Something went wrong- test your connection')
    })
    .done();
  }

  //Get the AWT token given the username and password state of the app
  _submitLogin() {
    const { username, password } = this.state
    if (username == null || password == null) {
      this._promptLogin();
      return;
    }
    fetch(config.url + config.login,
      {method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})})
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success === true) {
        AsyncStorage.removeItem('bundlePosts')
        AsyncStorage.setItem(async_keys.USER, JSON.stringify(responseData.user));
        AsyncStorage.setItem(async_keys.TOKEN, responseData.token, () => this._toMainView());
      } else {
        this._displayIncorrectLogin();
      }
       return responseData;
     })
    .catch(function(err) {
      alert('Something went wrong- test your connection')
    })
    .done();
  }

  _displayIncorrectLogin(){
    Alert.alert('Try again', 'Incorrect username and password')
  }

  _promptLogin() {
    Alert.alert('Empty fields', 'Please enter username and password or register')
  }

  _toMainView() {
    this.props.navigator.push({
      id:'mainView',
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
    });
  }

}

module.exports = LoginScreen
