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
  Image,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import Icon from 'react-native-vector-icons/FontAwesome'
styles = require('../Styles/Layouts');
var NavigationBar = require('react-native-navbar');
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      ]),
      refreshing: false,
    };
  }

  componentDidMount() {
    console.log("Component did mount");
    this._fetchData()
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._fetchData();
    this.setState({refreshing: false});
  }

  _fetchData() {
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/listings",
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
              posts.push({
                image: require('../resources/Saddle-Billed_Stork.jpg'), price: item.price, likes: "5"
              })
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(posts)
            });
            console.log("Successfully grabbed data");
            alert("Success")
         })
        .catch(function(err) {
          alert("error");
          console.log("Error in Posting");
          console.log(err);
        })
        .done();
    });
  }

  leftButton() {
    return  (
      <View style = {styles.navIcon}>
        <Ionicons name="ios-settings" size={30}/>
      </View>
    );
  }

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <Ionicons name="ios-add" size={30} onPress={(event) => {this.goToNewPost()}}/>
      </View>
    );
  }

  goToNewPost() {
    this.props.navigator.push({
        id: 'newPost'
    });
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
          leftButton = {this.leftButton()}
          rightButton = {this.rightButton()}
        />
        <View style={styles.storkFront}>
          <View style = {styles.storkFrontBanner}>
            <Image style = {styles.storkfrontProfileImage} source={DefaultProfileImage} />
            <Text style = {styles.storkfrontProfileText}>Username</Text>
          </View>
          <View style = {{flex:1}}>
          <ListView
            style = {styles.storkfrontList}
            initialListSize = {1}
            dataSource = {this.state.dataSource}
            renderRow = {this._renderPost}
            renderSeparator = {this._renderSeparator}
            refreshControl = {
              <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
              />
            }
          />
          </View>
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
