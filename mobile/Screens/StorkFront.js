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
    // TODO: profile
    return (
      <View style = {styles.storkfrontScreen}>
        <View style = {styles.centered && {flexDirection: "row"}}>
          <Image style = {styles.storkfrontProfileImage} source={DefaultProfileImage} />
          <Text style = {styles.storkfrontProfileText}>Description</Text>
          <View style={{flex: 1}}></View>
        </View>
        <View style={{height:50}}></View>
        <ListView
          style = {styles.storkfrontList}
          initialListSize = {1}
          dataSource = {this.state.dataSource}
          renderRow = {this._renderPost}
          renderSeparator = {this._renderSeparator}
        />
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
            size={50}
            backgroundColor="#DAF7A6">
            <Text style={styles.storkfrontPostText}>{data.likes}</Text>
          </Icon.Button>
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
