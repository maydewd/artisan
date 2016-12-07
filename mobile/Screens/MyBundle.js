/**
 * MyBundle, shows the posts the user has liked and saved
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
import {getScreenHeight, topNavBarHeight, getScreenWidth} from '../helpers/dimension'
import { SwipeListView } from 'react-native-swipe-list-view';
import {async_keys} from '../resources/Properties.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';
var NavigationBar = require('react-native-navbar');
const config = require('../config/server');
styles = require('../Styles/Layouts');

class MyBundle extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: [],
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.liked,
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }})
        .then((response) => response.json())
        .then((responseData) => {
            responseData.forEach((item) => {
              this.state.data.push(item)
            })
            this._updateList()
         })
        .catch(function(err) {
          alert(err.message);
        })
        .done();
    });
  }

  _updateList() {
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.data)
    });
  }

  render() {
    var titleConfig = {title: 'MyBundle'};
   const leftButtonConfig = {title: 'Back',handler: () => {this._pop()}};
    return (
      <View>
        <NavigationBar
        style={styles.navBar}
        title={titleConfig}
        leftButton={leftButtonConfig}
        />
        <SwipeListView
          enableEmptySections={true}
          disableRightSwipe={true}
          style = {styles.usableWithTop}
          dataSource = {this.state.dataSource}
          renderRow = {(item) => (
            <View
            style = {styles.bundleRow}>
              <Image style = {styles.bundleImage}
               source = {{uri: config.url + "/" + item.imagePath}}/>
               <TouchableOpacity style = {styles.rightPadding}>
                <Ionic onPress= {() => this._message(item)} name="ios-chatbubbles" size={30} color="black" />
              </TouchableOpacity>
             </View>
          )}
          renderHiddenRow = {(item, secId, rowId) => (
              <TouchableOpacity
              onPress={() => this._delete(item, rowId)}
              style = {styles.hiddenBundleRow}>
                <Text style = {styles.paddedWhiteText}>Remove</Text>
              </TouchableOpacity>
            )}
          rightOpenValue={-80}
        />
      </View>
    );
  }

  _message(data) {
    this.props.navigator.push({
        id: 'chat',
        itemID: data._id
    });
  }

  _delete(item, index) {
    var currID = item._id;
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.listings + currID + "/unlike",
        {method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success !== true) {
          console.log('Failed to unlike')
        }
         return responseData;
       })
      .catch(function(err) {
        alert(err.message);
      })
      .done();
    });
    delete this.state.data[index];
    this._updateList()
  }

  _pop() {
    this.props.navigator.pop()
  }
}

module.exports = MyBundle
