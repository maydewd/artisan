'use strict'
import React from 'react';
import { StyleSheet } from 'react-native';
import {getScreenWidth, getScreenHeight, topNavBarHeight, getUsableScreenHeight, usablePercent} from '../helpers/dimension'

const styles = StyleSheet.create({
    baseText: {
      // fontFamily: "serif"
    },

    centeredBuff: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 20,
    },

    loginScreenView: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: 40,
      backgroundColor: '#e6f2ff'
    },

    centered: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },

    navBar: {
      backgroundColor: '#cce5ff',
      height: topNavBarHeight()
    },

    navIcon: {
      padding: 10
    },

    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f6f6f6',
    },

    logo: {
      width: usablePercent(30),
      height: usablePercent(30)
    },

    textBox: {
      height: 40,
      width: getScreenWidth() * .9,
      borderWidth: 0.5,
      borderColor: '#0f0f0f',
      padding: 4,
      alignSelf: 'center'
    },

    groupedTextBoxes: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxHeight: 150
    },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },


//==================================
//  DISCOVER

    discoverImage: {
      flex: 1,
      resizeMode: 'contain',
      height: usablePercent(60),
    },

    discoverBlankImage: {
      flex: 1,
      height: usablePercent(60),
    },

    discoverIconInfo: {
      marginRight: 0
    },
    discoverButtonContainerUp: {
      // flex: 1,
      padding: 10,
      alignItems: "center",
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: '#DAF7A6'
    },
    discoverButtonContainerDown: {
      // flex: 1,
      padding: 10,
      alignItems: "center",
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: '#ec7063'
    },


    discoverPostContainer: {
      width: 400,
      height: 300,
      alignItems: 'center',
      justifyContent: "space-around",
    },
    discoverPostImage: {
      resizeMode: 'contain',
      width: 400,
      height: 300
    },

//==================================
//  STORKFRONT

    storkfrontScreen: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 5
    },

    storkFront: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: "flex-start",
      alignItems: "center",
    },

    storkFrontBanner: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      maxHeight: 80,
      padding: 5
    },

    //Remove this hardcoded 80 - it corresponds to profile height
    storkfrontList: {
      width: getScreenWidth(),
      maxHeight: getUsableScreenHeight() - 80
    },

    storkfrontList2: {
      flex: 1,
      flexDirection: 'column'
    },

    storkfrontProfileImage: {
      resizeMode: 'contain',
      height: 75,
      width: 75
    },

    storkfrontProfileText: {
      flex: 1,
      padding: 10,
      fontSize: 16,
    },

    storkfrontImage: {
      resizeMode: 'contain',
      height: usablePercent(60),
      width: getScreenWidth()
    },

    storkfrontPostText: {
      fontSize: 14,

    },
});

module.exports = styles
