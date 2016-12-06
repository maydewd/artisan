# Technical Documentation

## Mobile

### Launch and Screens

Under the */mobile folder* there are two documents called index.ios.js and index.android.js.  These are the two files that are run upon launching the app, for iOS and Android respectively.  These two files are designed to be as simple as possible.  They simply render the navigator with the initial route, which in this case is the login screen.

The code for the main screens can be found in the */mobile/Screens* folder.  Each of these files extends the React Native Component class and thus implements the *render* method. To add a new screen, add another javascript file to this directory that extends the React Native Component class.  Additionally, each of these files should export the Component class itself.  

### Navigation

Navigation is handled using React Native's built in Navigator class.  To clearly see the current routes of Navigation reference the *Navigation.js* file under */mobile/helpers/*.  This file contains the render function that the main navigator that the index files use to start up the app.  To add a new screen to navigation a case needs to be added to this render function.  To properly due this add an *if* case that renders the proper screen given a *routeId*.  This *routeId* is provided when a new path is pushed onto the Navigator.  Please reference this file for all the necessary *routeId*'s.

**Navigating from one Component to Another**

In the *Navigation.js* render function, we pass the navigator to each component that is rendered through the props of the class.  Thus, in any of the component classes the Navigator can be accessed by `this.props.navigator`.

Minimally, to navigate from one component to another the following call has to be made, `this.props.navigator.push({id: 'PageName'});`, where PageName is the corresponding *routeId* from the render function.  Of course this "push" can be replaced with an valid React Native navigation call per this [documentation](https://facebook.github.io/react-native/docs/navigator.html).

Currently, necessary information passing between screens is done through the navigator.  When a new screen is pushed onto the Navigator additional information can be passed in the JSON of the navigator *push* or *replace*.  This can then be accessed directly in the *render* function in the *Navigation.js* file and then passed to the given Component through its props.  

**Bottom Tab Bar**

The tab bar on the bottom of the screen that switches between the Discover and StorkFront pages handles navigation slightly differently.  This class can be referenced in the */mobile/Components/BottomTabBar.js* file.  Rather than use navigation to switch between the Discover and StorkFront pages the BottomTabBar class renders the different screens manually (not through a Navigator call) based on what tab is selected.  This is best seen in the *renderContent* function.  

To render the Discover or StorkFront screen call the Navigator with the *routeId* mainView.  This will cause the Navigator to show the Bottom Tab Bar, which by default will render the Discover page.  To get the StorkFront screen to be shown on this navigation call pass 'storkFront' with the key 'route.screen' in the JSON of the Navigation call.

To add a new tab to the tab bar add the functionality in the `renderTabs()` function, which renders the tabs themselves, and in the `renderContent()` function, which renders the rest of the screen based on the state of the selected tab.

**Animation**

To animate the navigation the JSON key of 'sceneConfig' needs to be filled out with a value corresponding to a React Native [scene configuration](https://facebook.github.io/react-native/docs/navigator.html).  An example where such animation is added are the `_register()` and `_toAboutPage()` functions from the *LoginScreen.js* file.

**Push vs Pop vs Replace**

The difference between pushing, popping, and replacing can best be described in the React Native documentation. However, it is important to note that there are several places when a push or replace is used when a pop seems more intuitive.  The reason for this is to force a call to the ComponentDidMount function of the component being navigated to.  Often this ComponentDidMount function includes code for refreshing the screen (grabbing new information from the server).  Thus, there is no necessity for these pushes to be replaced with pops if more robust logic is added to the components to refresh with new information when desired.

### Property Files, Styling, and Configuration

**Properties File**

The */mobile/resources/Properties.js* contains several properties.  This includes information regarding the ASYNC storage keys and Google API Keys (used for geolocation).

**Styling**

All CSS styling is located in */mobile/Styles/Layouts.js*.  This file is organized with headers that generally group styles by screen.

**Config**

All server URL configurations can be found in */mobile/Config/Server.js*.

**Other resources**

Other resources, such as images, can be found in the */mobile/resources/* folder. The current logo being used is the storkdLogo.png.

### Test Suite

The test suit for the mobile application can be found under  */mobile/__test__/*.  The testing framework being used is [Jest](https://facebook.github.io/jest/docs/tutorial-react-native.html).

This test suit can be run with the command "npm test".  Running the command "npm test -- -u" will overwrite the screenshots from the last test.

### Geolocation

## Server
