/**
 * Storkfront screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import Icon from 'react-native-vector-icons/FontAwesome'
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');

const DefaultProfileImage = require("../resources/profile.png");

class StorkFront extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // TODO: hook up data source to server
    this.state = {
      dataSource: ds.cloneWithRows([
        {image: require('../resources/Saddle-Billed_Stork.jpg'), price: "$10", likes: "5"},
        {image: require('../resources/Logo1.png'), price: "$5", like: "0"}
      ])
    };
  }
  render() {

    var titleConfig = {
     title: 'StorkFront',
   };
    // TODO: profile
    return (
      <View>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
        />
        <View style={styles.storkFront}>
          <View style = {styles.storkFrontBanner}>
            <Image style = {styles.storkfrontProfileImage} source={DefaultProfileImage} />
            <Text style = {styles.storkfrontProfileText}>Description</Text>
          </View>
          <ListView
            style = {styles.storkfrontList}
            initialListSize = {1}
            dataSource = {this.state.dataSource}
            renderRow = {this._renderPost}
            renderSeparator = {this._renderSeparator}
          />
        </View>
      </View>
    );
  }
  _renderPost(data) {
    return (
      <View style = {styles.container}>
        <Image style = {styles.storkfrontImage} source = {data.image}/>
        <View style = {styles.centered && {flexDirection: "row"}}>
          <Icon.Button
            name="thumbs-up"
            size={25}
            color = 'black'
            padding = {2}
            backgroundColor= 'rgba(0,0,0,0)'
            >
          </Icon.Button>
          <Text style={styles.storkfrontPostText}>{data.likes}</Text>
          <View style={{flex:1}}></View>
          <Text style = {styles.storkfrontPostText}>
            {data.price}
          </Text>
        </View>
      </View>
    )
  }
  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // TODO:
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={
          { height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
          }
        }
      />
    );
  }
}

module.exports = StorkFront
