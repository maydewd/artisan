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
var myPhotoGetter = require('NativeModules').CameraRoll;

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      number: 0
    };
  }

  render() {
    var titleConfig = {
     title: 'New Post',
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
          style={{height: 80, padding: 5}}
          multiline = {true}
          numberOfLines = {4}
          placeholder="Enter Description"
          onChangeText={(description) => this.setState({description})}
        />
        <Button
          containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          style={{fontSize: 20, color: 'blue'}}
          onPress={() => this._post()}>
          Post
        </Button>
        <Text> {this.state.number} </Text>
      </View>
    );
  }

  changeNumber() {
    myPhotoGetter.getPhoto(5, (error, result) => {
      if(error) {
        console.error(error);
      } else {
        this.setState({number: result});
      }
    })
  }

  _post() {
    this.changeNumber();
    const {description} = this.state;
    console.log(description)
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = NewPost
