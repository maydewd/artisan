import React from 'react';
import LoginScreen from '../Screens/LoginScreen.js'
import NewPost from '../Screens/NewPost.js'
import DiscoverPost from '../Screens/DiscoverPost.js'
import StorkfrontPost from '../Screens/StorkfrontPost.js'
import MainNavBar from '../Components/MainNavBar.js'
import Discover from '../Screens/Discover.js'
import DiscoverSettings from '../Screens/DiscoverSettings.js'
import StorkFront from '../Screens/StorkFront.js'
import MyBundle from '../Screens/MyBundle.js'
import Messages from '../Screens/Messages.js'
import BottomTabBar from '../Components/BottomTabBar.js'
import Chat from '../Screens/Chat.js'
import ProfileSettings from '../Screens/StorkFrontSettings.js'
import FB from '../Screens/FB.js'

export function render(route, navigator) {
  var routeId = route.id;
  if (routeId === 'login') {
    return (
      <LoginScreen
        navigator={navigator} />
    );
  }
  if (routeId === 'discover') {
    return (<BottomTabBar
      navigator={navigator} />
    );
  }
  if (routeId === 'mainView') {
    return (
      <BottomTabBar
        navigator={navigator} />
    );
  }
  if (routeId === 'discoverSettings') {
    return (
      <DiscoverSettings
        navigator={navigator} />
    );
  }
  if (routeId === 'myBundle') {
    return (
      <MyBundle
        navigator={navigator} />
    );
  }
  if (routeId === 'newPost') {
    return (
      <NewPost
        navigator={navigator} />
    );
  }
  if (routeId === 'discoverPost') {
    return (
      <DiscoverPost
        item={route.item}
        navigator={navigator} />
    );
  }
  if (routeId === 'storkfrontPost') {
    return (
      <StorkfrontPost
        item={route.item}
        navigator={navigator} />
    );
  }
  if (routeId === 'messages') {
    return (
      <Messages
        navigator={navigator} />
    );
  }
  if (routeId === 'chat') {
    return (
      <Chat
        itemID = {route.itemID}
        navigator={navigator} />
    );
  }

  if (routeId === 'profileSettings') {
    return (
      <ProfileSettings
        navigator={navigator} />
    );
  }
}
