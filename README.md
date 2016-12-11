# Storkd

An app aimed at creating an authentic, genuine space for artists to share their art with their local community and travelers for purchase.

### Our Story

This app is the brain child of Brian Anderson, a frequent traveler and art lover. On his trips he wished there was an app that allowed him to buy genuine, local art - something with a story and more meaningful than a cheap, cookie-cutter souvenir. From this Storkd was born.

### Purpose

E-commerce apps focusing on the sale of art is already a populated market, with options such as Etsy to Craigslist existing for individual sellers.  However, we feel that all of them lack a sense of authenticity - you browse a website and order items which may or may not be handmade. What we hope to achieve with Stork'd is an experience that is more personal for both consumer and artisan.  

Currently, if someone who is traveling decides they want to buy a local artwork as a souvenir, they might go to a gift shop and get some unoriginal trinket. However, with Stork'd, they can find a specific, unique piece of art in the local area, and interact directly with the artisan who made it. Not only does this add a sense of authenticity to the souvenir, the discovery of the item and the transaction become a unique, memorable experience.  

For the artisan, Storkd provides a way to build a local presence and connect with the local community, providing a quick and easy way to sell goods.  It's as simple as taking a picture, adding a price and appropriate tags.

### Team

Clients:
* Brian Anderson
* Edreys Wajed

Dev Team:
* Ryan St.Pierre
* David Maydew
* Sung-Hoon Kim

### Technical Specs

* React Native JS
* Node JS
* Jest
* Node Package Manager (npm)

### Abbreviated Install Instructions
(see /doc/AppMaintenanceDoc/ for more details)
* App: pull repository and follow install instructions for downloading React Native.  Next follow the more specific instructions below based on platform:
	* iOS: in /app/InstallInstructions.txt, start emulator with react-native run-ios or through Xcode by opening the Xcode project in /mobile/ios/Storkd.xcodeproj.
	* Android:
* Server: pull repository, follow provision instructions in /server/provision/notes_provision.txt, start up server with npm start (or pm2 start) from /server/ directory.

### File Structure

**/mobile/**
* test: test suite
* android: generated build files for Android
* Components: classes used as mini UI components in the project
* config: configuration files (server URL)
* helpers: general helper functions (such as dimensions and form validation)
* resources: images and property files
* Screens: code for each Component screen that is viewed in the app
* Styles: CSS style sheets

**/server/**
* app: code responsible for running nodeJS server
  * config: routing and middleware for requests
  * controllers: grouped handlers for each route
  * models: mongoose/mongodb object models with fields and types
* provision: scripts and notes for provisioning fresh server
* public: static files to be publicly accessible
* test: script responsible for running server-side automated tests

### Folders

* doc
  * AppMaintenance
		* App
		* Server
  * ClassDocs
    * MeetingNotes
  * TechnicalDoc
    * App
		* Server
  * UserDoc
* mobile
  * test
  * android
  * Components
  * config
  * helpers
  * ios
  * resources
  * Screens
  * Styles
* server
  * app
    * config
      * passport
    * controllers
    * models
  * provision
  * public
    * uploads
  * test
