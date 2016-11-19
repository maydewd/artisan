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
import {usableWithTop} from '../helpers/dimension'
import { SwipeListView } from 'react-native-swipe-list-view';
styles = require('../Styles/Layouts');
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {

  constructor(props) {
     super(props);
     this.state = {messages: []};
     this.onSend = this.onSend.bind(this);
     this.renderActions = this.renderActions.bind(this);
   }

   componentWillMount() {

     if (this.props.conversationID == null) {
       this._fetchMessages("item/" + this.props.itemID);
     } else {
       this._fetchMessages(this.props.conversationID);
     }
   }

   _fetchMessages(route) {
     var route = "http://colab-sbx-137.oit.duke.edu:3000/api/messages/" + route;
     console.log(route);
     AsyncStorage.getItem('jwtToken', (err, result) => {
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
               holder.push(this._reformat(item));
             })
             this.setState({
               messages: holder
             });
          })
         .catch(function(err) {
           alert("error");
           console.log("Error in Posting");
           console.log(err);
         })
         .done();
     });
   }

   _reformat(item) {

     var imagePath =  item.sender.imagePath;
     if (imagePath == null) {
       imagePath = item.sender.facebookImagePath;
     } else {
       imagePath = "http://colab-sbx-137.oit.duke.edu:3000/" + imagePath
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
      this._post(messages[0]);
      return {
        messages:updated
      };
    });
  }

  _post(message) {
    AsyncStorage.getItem('jwtToken', (err, result) => {
      fetch("http://colab-sbx-137.oit.duke.edu:3000/api/messages/item/" + this.props.itemID,
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
        console.log(responseData);
        if (responseData.success !== true) {
          console.log('Failed to send to server')
        }
         return responseData;
       })
      .catch(function(err) {
        console.log("Error");
        console.log(err);
      })
      .done();
    });
  }

  //Fill this in if we want to render something to the left of the input box
  renderActions() {

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
        <View style ={{minHeight: usableWithTop()}}>
          <GiftedChat
           messages={this.state.messages}
           onSend={this.onSend}
           //Add back if desired
           //renderActions={this.renderActions}
           user={{
             _id: '58212d547544970d0fd22916',
           }}
           />
         </View>
        </View>
    );
  }

  pop() {
    this.props.navigator.pop()
  }

}

module.exports = Chat
