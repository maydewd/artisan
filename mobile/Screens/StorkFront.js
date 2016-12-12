/**
 * Storkfront screen
 * Shows the user's profile information and posts.
 * Gives user options to edit options, make a new post, edit posts, and check messages
 * Ryan St.Pierre, David Maydew, Sung-Hoon Kim
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl,
  Navigator
} from 'react-native';
import BottomNav from '../Components/BottomNav'
import Icon from 'react-native-vector-icons/FontAwesome'
styles = require('../Styles/Layouts');
import {async_keys} from '../resources/Properties.js';
var NavigationBar = require('react-native-navbar');
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const config = require('../config/server');

const DefaultProfileImage = require("../resources/profile.png");

class StorkFront extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false,
      profile: null
    };
    this._renderPost = this._renderPost.bind(this);
  }

  componentDidMount() {
    this._fetchProfile()
    this._fetchData()
  }

  _fetchProfile() {
    AsyncStorage.getItem(async_keys.USER, (err, result) => {
      this.setState({
        profile: JSON.parse(result)
      })
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this._fetchData();
    this.setState({refreshing: false});
  }

  _fetchData() {
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.me,
        {method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
      }})
      .then((response) => response.json())
      .then((responseData) => {
        var posts = [];
        responseData.forEach((item) => {posts.push(item)});
        this.setState({
          // populate ListView with user's posts
          dataSource: this.state.dataSource.cloneWithRows(posts)
        });
       })
      .catch(function(err) {
        alert(err.message);
      })
      .done();
    });
  }

  leftButton() {
    return  (
      <View style = {styles.navIcon}>
        <FontAwesome name= "inbox" size={25} onPress={(event) => {this.goToMessages()}}/>
      </View>
    );
  }

  rightButton() {
    return (
      <View style = {styles.navIcon}>
        <FontAwesome name="plus-circle" size={25} onPress={(event) => {this.goToNewPost()}}/>
      </View>
    );
  }

  goToNewPost() {
    this.props.navigator.push({
      id: 'newPost',
      sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
    });
  }

  goToMessages() {
    this.props.navigator.push({
      id: 'messages'
    });
  }

  goToProfileSettings() {
    this.props.navigator.push({
      id: 'profileSettings',
      profile: this.state.profile
    });
  }

  render() {
    var titleConfig = {title: 'StorkFront',};
    var username = "";
    if(this.state.profile == null) {
      var imageSource={DefaultProfileImage};
    } else if(this.state.profile.imagePath == null) {
      var imageSource = {uri: this.state.profile.facebookImagePath};
      username = this.state.profile.username
    } else {
      var imageSource= {uri: config.url + "/" + this.state.profile.imagePath};
      username = this.state.profile.username
    }
    return (
      <View style={styles.navScreen}>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          leftButton = {this.leftButton()}
          rightButton = {this.rightButton()}
        />
        <View style={styles.storkFront}>
          <View style = {styles.storkFrontBanner}>
            <Image style = {styles.storkfrontProfileImage} source={imageSource} />
            <Text style = {styles.storkfrontProfileText}>{username}</Text>
            <Ionicons
              name = "ios-settings"
              size = {30}
              onPress={(event) => {this.goToProfileSettings()}}
              style = {{paddingRight: 8}}
            />
          </View>
          <View style = {{flex:1}}>
          <ListView
            enableEmptySections={true}
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
      <TouchableOpacity style = {styles.container} onPress={() => this._postPressed(data)}>
        <Image
          style = {styles.storkfrontImage}
          source = {{uri: config.url + "/" + data.imagePath}}
        />
        <View style = {styles.centered && {flexDirection: "row"}}>
          <Text style={styles.storkfrontPostText}>
            <Icon
              name="thumbs-up"
              size={25}
              color = 'black'
              padding = {2}
              backgroundColor= 'rgba(0,0,0,0)'
            />
            {" "}{data.numLikes}
          </Text>
          <View style={{flex:1}}></View>
          <Text style = {styles.storkfrontPostText}>
            {'$' + data.price}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
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

  _postPressed(data) {
    this.props.navigator.push({
      id: 'storkfrontPost',
      item: data
    });
  }
}

module.exports = StorkFront
