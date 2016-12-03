/**
 * Messaging
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import {usableWithTop, getScreenWidth} from '../helpers/dimension'
import { SwipeListView } from 'react-native-swipe-list-view';
styles = require('../Styles/Layouts');
import {async_keys} from '../resources/Properties.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';

class Messages extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    this._fetchMessages();
  }

  _fetchMessages() {
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/messages/conversations",
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }})
        .then((response) => response.json())
        .then((responseData) => {
          console.log("RESPONSE");
          console.log(responseData);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
          });
         })
        .catch(function(err) {
          console.log(err);
        })
        .done();
    });
  }

  render() {
    var titleConfig = {
     title: 'Messages',
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
        <ListView
          style = {{height: usableWithTop(), width: getScreenWidth()}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    );
  }

  renderRow(rowData) {
    var imagePath = rowData.item.imagePath;
    var displayText = rowData.buyer.username;
    return (
      <View style = {{flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center'}}>
        <Image style = {{height: 80, width: 80}}
         source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + imagePath}}/>
         <Text> {displayText} </Text>
         <Icon
          onPress= {() => this._message(rowData._id)}
          style = {{paddingRight: 6, paddingTop: 6}}
          name="chevron-circle-right"
          size={28}
          color="black" />
      </View>
     );
  }

  _message(id) {
    this.props.navigator.push({
        id: 'chat',
        conversationID: id
    });
  }

  pop() {
    this.props.navigator.pop()
  }

}

module.exports = Messages
