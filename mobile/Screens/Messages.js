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
import Ionic from 'react-native-vector-icons/Ionicons';

class Messages extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(
        [{buyer: "Buyer 1"}, {buyer: "Buyer 2"}]
      ),
    };
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
        <ListView
          style = {{height: usableWithTop()}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    );
  }

  renderRow(rowData) {
    var imagePath = "public/uploads/listings/loading.jpg"
    return (
      <View style = {{flexDirection: 'row'}}>
        <Image style = {{height: 80, width: 80}}
         source = {{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + imagePath}}/>
         <Text> {rowData.buyer} </Text>
           <Ionic onPress= {() => this._mail(item)} name="ios-chatbubbles" size={30} color="black" />
      </View>
     );
  }

  mail(item) {
    console.log("trying to message");
  }

  pop() {
    this.props.navigator.pop()
  }

}

module.exports = Messages
