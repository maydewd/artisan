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
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello!',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      var updated = GiftedChat.append(previousState.messages, messages);
      console.log(updated);
      return {
        messages:updated
      };
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

  console.log(usableWithTop())
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
             _id: 1,
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
