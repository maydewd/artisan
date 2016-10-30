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

class MyBundle extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // TODO: hook up data source to server
    this.state = {
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

            var posts = [];
            responseData.forEach((item) => {
              posts.push(item)
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(posts)
            });
            console.log("Successfully grabbed data");
         })
        .catch(function(err) {
          alert("error");
          console.log("Error in Posting");
          console.log(err);
        })
        .done();
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
          style = {{height: getScreenHeight() -topNavBarHeight()-20}}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderPost}
          renderHiddenRow = {(item) => (
              <TouchableOpacity
              onPress={() => this._delete(item)}
              style = {{height: 80, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'red', width: getScreenWidth()}}>
                <Text>Remove</Text>
              </TouchableOpacity>
            )}
          rightOpenValue={-80}
        />
      </View>
    );
  }

  renderPost(item) {
    return (
        <View
        style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: getScreenWidth(), backgroundColor: 'white',}}>
          <Image style = {{height: 80, width: 80}}
           source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + item.imagePath}}/>
           <Text> End</Text>
         </View>
    )
  }

  _delete(data) {
    console.log("want to delete" + data._id)
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = MyBundle
