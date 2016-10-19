/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import LoginScreen from './Screens/LoginScreen.js'
import NewPost from './Screens/NewPost.js'
import DiscoverPost from './Screens/DiscoverPost.js'
import StorkfrontPost from './Screens/StorkfrontPost.js'
import MainNavBar from './Components/MainNavBar.js'
import Discover from './Screens/Discover.js'
import DiscoverSettings from './Screens/DiscoverSettings.js'
import StorkFront from './Screens/StorkFront.js'
import MyBundle from './Screens/MyBundle.js'
import BottomTabBar from './Components/BottomTabBar.js'

class Storkd extends Component {
  render() {
    return (
      <Navigator
         initialRoute={{id: 'login', name: 'Index'}}
         renderScene={this.renderScene.bind(this)}
         configureScene={(route) => {
           if (route.sceneConfig) {
             return route.sceneConfig;
           }
           return Navigator.SceneConfigs.FadeAndroid;
      }} />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'login') {
      return (
        <LoginScreen
          navigator={navigator} />
      );
    }
    if (routeId === 'mainView') {
      return (
        <BottomTabBar
          navigator={navigator} />
      );
    }
    if (routeId === 'discoverSettings') {
      return (
        <DiscoverSettings
          navigator={navigator} />
      );
    }
    if (routeId === 'myBundle') {
      return (
        <MyBundle
          navigator={navigator} />
      );
    }
    if (routeId === 'newPost') {
      return (
        <NewPost
          navigator={navigator} />
      );
    }
    if (routeId === 'discoverPost') {
      return (
        <DiscoverPost
          item={route.item}
          navigator={navigator} />
      );
    }
    if (routeId === 'storkfrontPost') {
      return (
        <StorkfrontPost
          item={route.item}
          navigator={navigator} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 40,
    height: 40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Storkd', () => Storkd);
