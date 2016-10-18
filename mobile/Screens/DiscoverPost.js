/**
 * screen for viewing discover post information
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Button from 'react-native-button'

styles = require('../Styles/Layouts');


class DiscoverPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.item.description,
      price: this.props.item.price,
      number: 0,  // TODO
      imagePath: this.props.item.imagePath,
      photoSource: null,  //TODO
      location: this.props.item.location,
      type: this.props.item.type
    };
  }

  render() {
    var titleConfig = {
      title: 'Discover Post',
    };
    const leftButtonConfig = {
      title: 'Back',
      handler: () => {this.pop()}
    };
    return (
      <View>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <ScrollView style = {{height: 600}}>
          <View
            style = {styles.discoverPostContainer}>
            { this.state.photoSource === null ? <Text>Image not found</Text> :
              <Image style={styles.discoverPostImage} source={this.state.photoSource} />
            }
          </View>
          <Text
            style={{height: 130, padding: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'gray'}}
            // multiline = {true}
            numberOfLines = {3}>
            {this.state.description}
          </Text>
          <Text
            style={{height: 40, padding: 5, borderBottomWidth: 1, borderColor: 'gray'}}>
            {this.state.location}
          </Text>
          <Text
            style={{height: 40, padding: 5, borderBottomWidth: 1, borderColor: 'gray'}}>
            {this.state.price}
          </Text>
          <Text
            style={{height: 40}}>
            {this.state.type}
          </Text>
        </ScrollView>
      </View>
    );
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = DiscoverPost
