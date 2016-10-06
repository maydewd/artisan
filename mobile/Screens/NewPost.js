/**
 * New Post Screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
var NavigationBar = require('react-native-navbar');
styles = require('../Styles/Layouts');
import Button from 'react-native-button'

class NewPost extends Component {

  render() {
    var titleConfig = {
     title: 'Post',
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
        <View style= {{height:20}}/>
        <TextInput
          style={styles.textBox}
          placeholder="Post"
          onChangeText={(post) => this.setState({post})}
        />
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{fontSize: 20, color: 'green'}}
          onPress={() => this._post()}>
          Post
        </Button>
      </View>

    );
  }

  _post() {
    const {post} = this.state;
    console.log(post)
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = NewPost
