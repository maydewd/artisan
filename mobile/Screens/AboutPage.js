import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');

class AboutPage extends Component {

  render() {
    var titleConfig = {title: 'About Page'};
    const leftButtonConfig = {title: 'Back', handler: () => {this._pop()}};
    return (
          <View>
            <NavigationBar
              style={styles.AboutNavBar}
              title={titleConfig}
              leftButton={leftButtonConfig}
            />
            <View style = {styles.AboutView}>
              <View>
                <Text style = {styles.AboutHeader}>Founders</Text>
                <Text style = {styles.AboutBasic}>Brian Anderson </Text>
                <Text style = {styles.AboutBasic}>Edreys Wajed</Text>
              </View>
              <View>
                <Text style = {styles.AboutHeader}>Dev Team</Text>
                <Text style = {styles.AboutBasic}>Ryan St.Pierre</Text>
                <Text style = {styles.AboutBasic}>David Maydew</Text>
                <Text style = {styles.AboutBasic}>Sung-Hoon Kim</Text>
              </View>
              <View>
                <Text style = {styles.DukeText}>Duke University</Text>
              </View>
            </View>
          </View>
    );
  }

  _pop() {
    this.props.navigator.pop()
  }

}
module.exports = AboutPage
