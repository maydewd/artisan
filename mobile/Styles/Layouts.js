'use strict'
import React from 'react';
import { StyleSheet } from 'react-native';
import {getScreenWidth, usableWithTop, getScreenHeight, topNavBarHeight, bottomNavBarHeight, getUsableScreenHeight, usablePercent} from '../helpers/dimension'

const styles = StyleSheet.create({

  //==================================
  //  NEW POST

  newPostContainer: {
    width:  getScreenWidth(),
    height: usablePercent(50),
    alignItems: 'center',
    justifyContent: "space-around",
    backgroundColor: '#f6f6f6'
  },
  newPostAvatar: {
    resizeMode: 'contain',
    width: getScreenWidth(),
    height: usablePercent(50)
  },
  story: {
    flex: 3,
    width: getScreenWidth(),
    minHeight: usablePercent(30),
    backgroundColor: 'white',
    paddingTop: 10,
    borderColor: 'gray',
    borderTopWidth: 1
  },
  askingPrice: {
    flex: 1,
    width: getScreenWidth(),
    minHeight: usablePercent(10),
    backgroundColor: 'white',
    borderColor: 'gray',
    borderTopWidth: 1
  },
  newPostType: {
    width: getScreenWidth(),
    minHeight: usablePercent(10),
    borderColor: 'gray',
    borderTopWidth: 1
  },
  flexAndWidth: {
    flex:1,
    width: getScreenWidth()
  },
  newPostButton: {
    padding:10,
    overflow:'hidden',
    maxHeight: bottomNavBarHeight(),
    backgroundColor: '#24518D',
    borderRadius: 2
  },


  //==================================
  //  Bundle

    usableWithTop: {
      height: usableWithTop()
    },
    bundleImage: {
      height: 80,
      width: 80
    },
    bundleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: getScreenWidth(),
      backgroundColor: 'white'
    },
    rightPadding: {
      paddingRight: 10
    },
    hiddenBundleRow: {
      height: 80,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'red',
      width: getScreenWidth()
    },
    paddedWhiteText: {
      color: 'white',
      paddingRight: 10
    },


  //==================================
  //  TABS

    tabcontainer: {
     flex: 1,
     backgroundColor: 'white'
    },
    tabTextActive: {
      fontSize: 10,
      color: '#24518D'
    },
    tabText: {
      fontSize: 10,
    },
    iconActive : {
      color: '#24518D'
    },
    tabIcon : {
      color: 'black'
    },
    tabItem: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
   },


  //==================================
  //  REGISTER

    registerNavBar: {
      backgroundColor: '#24518D',
      height: topNavBarHeight()
    },
    registerWidth: {
      width: 0.8 * getScreenWidth()
    },
    registerContainer: {
      width:  getScreenWidth()/2,
      height: getScreenWidth()/2,
      borderRadius: getScreenWidth()/4,
      alignItems: 'center',
      justifyContent: "space-around",
      backgroundColor: '#f6f6f6',
      borderColor: 'black',
      borderWidth: 1
    },
    registerAvatar: {
      resizeMode: 'stretch',
      width: getScreenWidth()/2,
      height: getScreenWidth()/2,
      borderRadius: getScreenWidth()/4,
    },
    registerBackground: {
      backgroundColor: 'white',
      height: usableWithTop(),
    },
    registerText: {
      textAlign: 'center',
      color: '#24518D',
      paddingTop: 5,
      marginBottom: 5,
      fontSize: 20
    },
    bottomBorder: {
      borderBottomColor: '#24518D',
      borderBottomWidth: 2,
      width: getScreenWidth(),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    registerRow: {
      flexDirection: 'row',
      alignItems: 'center',

    },
    registerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    registerCancel: {
      color: 'white'
    },
    registerArrow: {
      color: 'white',
      paddingLeft: 10
    },
    baseText: {
      // fontFamily: "serif"
    },
    centeredBuff: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 20,
    },


  //==================================
  //  LOGIN

    loginTopTextField: {
      width: getScreenWidth() * .9,
      backgroundColor: 'white',
      borderTopRightRadius:10,
      borderTopLeftRadius:10
    },
    loginBottomTextField: {
      width: getScreenWidth() * .9,
      backgroundColor: 'white',
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10
    },
    loginButton: {
          paddingTop: 7,
          width: 110,
          height:40,
          overflow:'hidden',
          borderRadius:4,
          backgroundColor: 'pink'
    },
    topLoginView: {
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: '#e6f2ff',
        height: getScreenHeight()
    },
    loginImage: {
      width: usablePercent(30),
      height: usablePercent(30)
    },
    loginScreenView: {
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
    centeredBoth: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
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
      textDecorationLine: 'underline'
    },


  //==================================
  //  DISCOVER
    discover: {
      backgroundColor: 'white',
      height: getUsableScreenHeight(),
    },
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
    // TODO the stylings for the different post screens are nearly identical
    discoverPostContainer: {
      // width: 400,
      // height: 300,
      alignItems: 'center',
      justifyContent: "space-around",
    },
    discoverPostImage: {
      resizeMode: 'contain',
      width: getScreenWidth(),
      height: usablePercent(50),
    },
    discoverPostStory: {
      flex: 3,
      width: getScreenWidth(),
      minHeight: usablePercent(20),
      backgroundColor: 'white',
      paddingTop: 10,
      borderColor: 'gray',
      borderTopWidth: 1
    },
    discoverPostLocation: {
      flex: 1,
      width: getScreenWidth(),
      minHeight: usablePercent(10),
      backgroundColor: 'white',
      borderColor: 'gray',
      borderTopWidth: 1
    },
    discoverPostPrice: {
      flex: 1,
      width: getScreenWidth(),
      minHeight: usablePercent(10),
      backgroundColor: 'white',
      borderColor: 'gray',
      borderTopWidth: 1
    },
    discoverPostType: {
      width: getScreenWidth(),
      minHeight: usablePercent(10),
      borderColor: 'gray',
      borderTopWidth: 1
    },
    contactButtonContainer: {
      padding:10,
      alignItems: "center",
      overflow:'hidden',
      maxHeight: bottomNavBarHeight(),
      backgroundColor: '#24518D',
      borderRadius: 2
    },
    contactButton: {
      fontSize: 20,
      color: 'white'
    },

    // Right Nav Icon in Discover
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 21,
      height: 21,
      borderRadius: 21/2,
      backgroundColor: 'rgb(255, 102, 102)',
      position: 'absolute',
      top: 4,
      left: 0
    },
    displayText: {
      fontSize: 12,
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'rgb(255,255,255)'
    },
    settingsText: {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 16,
      textAlign: 'center',
    },
    settingsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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
      height: getUsableScreenHeight(),
    },
    storkFrontBanner: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      maxHeight: 80,
      padding: 5,
      borderWidth: 1,
      borderColor: 'pink',
    },
    // TODO: Remove this hardcoded 80 - it corresponds to profile height
    storkfrontList: {
      width: getScreenWidth(),
      maxHeight: getUsableScreenHeight() - 80
    },
    storkfrontList2: {
      flex: 1,
      flexDirection: 'column'
    },
    storkfrontProfileImage: {
      resizeMode: 'stretch',
      height: 75,
      width: 75,
      borderRadius: 37
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


  //==================================
  //  STORKFRONT POST

    sPostImageContainer: {
      width:  getScreenWidth(),
      height: usablePercent(50),
      alignItems: 'center',
      justifyContent: "space-around",
      backgroundColor: '#f6f6f6'
    },
    sPostAvatar: {
      resizeMode: 'contain',
      width: getScreenWidth(),
      height: usablePercent(50)
    },
    storkfrontPostText: {
      fontSize: 14,
      padding: 10,
    },
    saveButtonContainer: {
      flex: 1,
      padding:10,
      alignItems: "center",
      overflow:'hidden',
      maxHeight: bottomNavBarHeight(),
      backgroundColor: '#24518D',
      borderRadius: 2
    },
    saveButton: {
      fontSize: 20,
      color: 'white'
    },
    deleteButtonContainer: {
      flex: 1,
      padding:10,
      alignItems: "center",
      overflow:'hidden',
      maxHeight: bottomNavBarHeight(),
      backgroundColor: '#ec7063',
      borderRadius: 2
    },
    deleteButton: {
      fontSize: 20,
      color: 'white'
    },

  //==================================
  //  STORKFRONT/PROFILE SETTINGS

    profileSettings: {
      flex: 1,
      // flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      maxHeight: 80,
      padding: 5
    },
    // TODO: this layout is identical to ones used in register
    profileImageContainer: {
      width: getScreenWidth()/2,
      height: getScreenWidth()/2,
      borderRadius: getScreenWidth()/4,
      alignItems: 'center',
      justifyContent: "space-around",
      backgroundColor: '#f6f6f6',
      borderColor: 'black',
      borderWidth: 1
    },
    profileImage: {
      resizeMode: 'stretch',
      width: getScreenWidth()/2,
      height: getScreenWidth()/2,
      borderRadius: getScreenWidth()/4,
    },
    fullWidthSaveButtonContainer: {
      flex: 1,
      padding:10,
      alignItems: "center",
      overflow:'hidden',
      maxHeight: bottomNavBarHeight(),
      width: getScreenWidth(),
      backgroundColor: '#24518D',
      borderRadius: 2
    },
    logoutContainer: {
      flex: 1,
      padding:10,
      alignItems: "center",
      overflow:'hidden',
      maxHeight: bottomNavBarHeight(),
      width: getScreenWidth(),
      backgroundColor: '#ec7063',
      borderRadius: 2
    },
    logout: {
      fontSize: 20,
      color: 'white'
    },


  //==================================
  //  ABOUT PAGE

    AboutView: {
      height: usableWithTop(),
      alignItems: "center",
      justifyContent: 'space-around',
      backgroundColor: '#003366'
    },
    AboutHeader: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 24,
      color: 'white'
    },
    AboutBasic: {
      textAlign: 'center',
      marginBottom: 2,
      color: 'white'
    },
    DukeText: {
      textAlign: 'center',
      color: 'white'
    },
    AboutNavBar: {
      backgroundColor: 'white',
      height: topNavBarHeight(),
      borderBottomWidth: 4,
      borderBottomColor: 'pink'
    }
});

module.exports = styles
