/**
 * Discover Screen
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
import MainNavBar from '../Components/MainNavBar'
import Icon from 'react-native-vector-icons/FontAwesome'
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');

const ExampleData = [
  {image: require('../resources/Saddle-Billed_Stork.jpg')},
  {image: require('../resources/Logo1.png')}
]

class Discover extends Component {
  constructor(props) {
    super(props);
    // TODO: make this better
    this.state = { data: ExampleData[0] };
  }

  render() {
    var titleConfig = {
     title: 'Discover',
   };

    return (
      <View View >
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        />
        <View style = {styles.centered}>
          <Image
               style = {styles.discoverImage}
               source = {this.state.data.image}
          />
          <View style = {styles.centered && {flexDirection: "row"}}>
            <Icon.Button
              name="thumbs-down"
              size={50}
              iconStyle={{marginRight: 0}}
              backgroundColor="#ec7063"
              onPress={() => this._thumbsDownPressed()}>
            </Icon.Button>
            <View style={{flex:1}}></View>
            <Icon.Button
              name="thumbs-up"
              size={50}
              iconStyle={{marginRight: 0}}
              backgroundColor="#DAF7A6"
              onPress={() => this._thumbsUpPressed()}>
            </Icon.Button>
          </View>
        </View>
      </View>
    );
  }
  _thumbsDownPressed() {
    // TODO: temp
    this.setState({ data: ExampleData[1]})
  }
  _thumbsUpPressed() {
    // TODO:
  }
}

module.exports = Discover
