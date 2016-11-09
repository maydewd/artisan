/**
 * screen for viewing discover post information
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';
var NavigationBar = require('react-native-navbar');
import Button from 'react-native-button';
import {usableWithTop, usablePercent} from '../helpers/dimension';
import { Kohana } from 'react-native-textinput-effects';
import FA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

styles = require('../Styles/Layouts');


class DiscoverPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.item.description,
      price: this.props.item.price,
      number: 0,  // TODO
      imagePath: this.props.item.imagePath,
      locality: this.props.item.locality,
      type: this.props.item.type
    };
  }
  _contact() {
    // TODO
  }
  render() {
    var titleConfig = {
      title: 'Discover Post',
    };
    const leftButtonConfig = {
      title: 'Back',
      handler: () => {this.pop()}
    };
    // TODO: put uri somewhere else
    return (
      <View>
        <NavigationBar
          style={styles.navBar}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <ScrollView style = {{height: usableWithTop()}}>
          <View
            style = {styles.discoverPostContainer}>
            <Image style={styles.discoverPostImage} source={{uri: "http://colab-sbx-137.oit.duke.edu:3000/" + this.state.imagePath}} />
          </View>
          {/* Description */}
          <Kohana
            style={styles.discoverPostStory}
            editable= {false}
            label={'Story'}
            iconClass={FA}
            iconName={'book'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            multiline = {true}
            numberOfLines = {2}
            value = {this.state.description != null ? this.state.description.toString() : "N/A"}
          />
          <Kohana
            style={styles.discoverPostLocation}
            editable= {false}
            label={'Location'}
            iconClass={FA}
            iconName={'globe'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            value = {this.state.locality != null ? this.state.locality.toString() : "N/A"}
          />
          <Kohana
            style={styles.discoverPostPrice}
            editable= {false}
            label={'Asking Price'}
            iconClass={MaterialIcons}
            iconName={'payment'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            value = {this.state.price != null ? this.state.price.toString() : "N/A"}
          />
          <Kohana
            style = {styles.discoverPostType}
            editable= {false}
            label={'Type'}
            iconClass={MaterialIcons}
            iconName={'subject'}
            iconColor={'#24518D'}
            labelStyle={{ color: 'pink' }}
            inputStyle={{ color: '#24518D' }}
            value={this.state.type != null ? this.state.type.toString() : "N/A"}
          />
          <Button
            containerStyle={styles.contactButtonContainer}
            style={styles.contactButton}
            onPress={() => this._contact()}>
            <Icon name="envelope" size={usablePercent(6)}/>
          </Button>
        </ScrollView>
      </View>
    );
  }

  pop() {
    this.props.navigator.pop()
  }
}

module.exports = DiscoverPost
