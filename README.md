# Storkd

An app aimed at creating an authentic, genuine space for artists to share their art with their local community and travelers for purchase.

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
* App:
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
  * ClassDocs
    * MeetingNotes
  * TechnicalDoc
    * App
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
