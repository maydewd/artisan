/**
 * Messages, showing a user their messages
 * Ryan St.Pierre, Sung-Hoon Kim, David Maydew
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
import {usableWithTop, getScreenWidth} from '../helpers/dimension'
import { SwipeListView } from 'react-native-swipe-list-view';
import {async_keys} from '../resources/Properties.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');
const config = require('../config/server');

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
      fetch(config.url + config.conversations,
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }})
        .then((response) => response.json())
        .then((responseData) => {
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
   var titleConfig = {title: 'Messages'};
   const leftButtonConfig = {title: 'Back', handler: () => {this._pop()}};
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
         source = {{uri: config.url + "/" + imagePath}}/>
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

  _pop() {
    this.props.navigator.pop()
  }

}

module.exports = Messages
