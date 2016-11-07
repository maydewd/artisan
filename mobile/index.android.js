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
  Image,
  Navigator
} from 'react-native';
import LoginScreen from './Screens/LoginScreen.js'
import NewPost from './Screens/NewPost.js'
import DiscoverPost from './Screens/DiscoverPost.js'
import StorkfrontPost from './Screens/StorkfrontPost.js'
import Discover from './Screens/Discover.js'
import DiscoverSettings from './Screens/DiscoverSettings.js'
import StorkFront from './Screens/StorkFront.js'
import MyBundle from './Screens/MyBundle.js'
import Messages from './Screens/Messages.js'
import BottomTabBar from './Components/BottomTabBar.js'
import {render} from './helpers/Navigation.js'

class Storkd extends Component {
  render() {
    return (
      <Navigator
         initialRoute={{id: 'login'}}
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
    return render(route, navigator)
  }
}

AppRegistry.registerComponent('Storkd', () => Storkd);
