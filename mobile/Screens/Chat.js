/**
 * The view corresponding to a one on one chat
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
import {usableWithTop} from '../helpers/dimension'
import {async_keys} from '../resources/Properties.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
const config = require('../config/server');
var NavigationBar = require('react-native-navbar');
styles = require('../Styles/Layouts');

class Chat extends Component {

  constructor(props) {
     super(props);
     this.state = {messages: []};
     this.onSend = this.onSend.bind(this);
   }

   componentWillMount() {
     if (this.props.conversationID == null) {
       this._fetchMessages("item/" + this.props.itemID);
     } else {
       this._fetchMessages(this.props.conversationID);
     }
     this._setUserId();
   }

   _setUserId() {
     AsyncStorage.getItem(async_keys.USER, (err, result) => {
         const userID = JSON.parse(result)._id;
         this.setState({
           userID: userID
         });
     });
   }

   _fetchMessages(route) {
     var route = config.url + config.messages + route;
     AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
       fetch(route,
         {method: "GET",
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': result
           }})
         .then((response) => response.json())
         .then((responseData) => {
             var holder = []
             responseData.forEach((item) => {
               holder.unshift(this._reformat(item));
             })
             this.setState({messages: holder});
          })
         .catch(function(err) {
           alert(err.message);
         })
         .done();
     });
   }

   //Reformats the item from the server to a format the GiftedChat 3rd party expects
   _reformat(item) {
     var imagePath =  item.sender.imagePath;
     if (imagePath == null) {
       imagePath = item.sender.facebookImagePath;
     } else {
       imagePath = config.url + "/" + imagePath
     }
     return ({
       _id: item._id,
       text: item.text,
       createdAt: item.createdAt,
       user: {
         _id: item.sender._id,
         name: item.sender.username,
         avatar: imagePath,
       }
     });
   }

  onSend(messages = []) {
    this.setState((previousState) => {
      var updated = GiftedChat.append(previousState.messages, messages);
      if (this.props.conversationID == null) {
        this._post(messages[0], "item/" + this.props.itemID);
      } else {
        this._post(messages[0], this.props.conversationID);
      }
      return {
        messages:updated
      };
    });
  }

  _post(message, route) {
    AsyncStorage.getItem(async_keys.TOKEN, (err, result) => {
      fetch(config.url + config.messages + route,
        {method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': result
          },
          body: JSON.stringify({text: message.text})
        })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success !== true) {
          alert('Failed to send to server')
        }
         return responseData;
       })
      .catch(function(err) {
        alert(err.message);
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
            <View style ={{minHeight: usableWithTop()}}>
              <GiftedChat
               messages={this.state.messages}
               onSend={this.onSend}
               user={{
                 _id: this.state.userID
               }}
               />
             </View>
          </View>
      );
  }

  _pop() {
    this.props.navigator.pop()
  }

}

module.exports = Chat
