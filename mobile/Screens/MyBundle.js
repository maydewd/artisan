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
  AsyncStorage
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import {getScreenHeight, topNavBarHeight} from '../helpers/dimension'


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
        <ListView
          style = {{height: getScreenHeight() -topNavBarHeight()-20}}
          dataSource = {this.state.dataSource}
          renderRow = {this._renderPost}
        />
      </View>
    );
  }

  _renderPost(item) {
    return (
        <Image style = {styles.storkfrontImage}
         source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + item.imagePath}}/>
    )
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = MyBundle
