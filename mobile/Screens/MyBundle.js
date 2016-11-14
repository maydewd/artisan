/**
 * MyBundle
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
import {getScreenHeight, topNavBarHeight, getScreenWidth} from '../helpers/dimension'
import { SwipeListView } from 'react-native-swipe-list-view';
styles = require('../Styles/Layouts');
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionic from 'react-native-vector-icons/Ionicons';

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
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/listings/liked",
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }})
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);

            responseData.forEach((item) => {
              this.state.data.push(item)
            })
            this._updateList()
         })
        .catch(function(err) {
          alert("error");
          console.log("Error in Posting");
          console.log(err);
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
    var titleConfig = {
     title: 'MyBundle',
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
        <SwipeListView
          enableEmptySections={true}
          disableRightSwipe={true}
          style = {{height: getScreenHeight() -topNavBarHeight()-20}}
          dataSource = {this.state.dataSource}
          renderRow = {(item) => (
            <View
            style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: getScreenWidth(), backgroundColor: 'white',}}>
              <Image style = {{height: 80, width: 80}}
               source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + item.imagePath}}/>
               <TouchableOpacity style = {{paddingRight: 10}}>
                <Ionic onPress= {() => this._mail(item)} name="ios-chatbubbles" size={30} color="black" />
              </TouchableOpacity>
             </View>
          )}
          renderHiddenRow = {(item, secId, rowId) => (
              <TouchableOpacity
              onPress={() => this._delete(item, rowId)}
              style = {{height: 80, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'red', width: getScreenWidth()}}>
                <Text style = {{color: 'white', paddingRight: 10}}>Remove</Text>
              </TouchableOpacity>
            )}
          rightOpenValue={-80}
        />
      </View>
    );
  }

  _mail(data) {
    console.log(data)
    this.props.navigator.push({
        id: 'chat',
        creator: data.creator
    });
  }

  renderPost(item) {
    return (
        <View
        style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: getScreenWidth(), backgroundColor: 'white',}}>
          <Image style = {{height: 80, width: 80}}
           source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + item.imagePath}}/>
           <TouchableOpacity style = {{paddingRight: 10}} onPress = {() => this.func()}>
            <Icon onPress= {console.log(item)} name="envelope" size={20} color="black" />
          </TouchableOpacity>
         </View>
    )
  }

  _delete(item, index) {
    var currID = item._id;
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/listings/" + currID + "/unlike",
        {method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success !== true) {
          console.log('Failed to unlike')
        }
         return responseData;
       })
      .catch(function(err) {
        console.log("Error in Login Fetch request");
        console.log(err);
      })
      .done();
    });
    delete this.state.data[index];
    this._updateList()
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = MyBundle
