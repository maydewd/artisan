# Artisan- Project Plan

Ryan St.Pierre, David Maydew, Sung-Hoon Kim

# Overall

We intend to deliver an iOS application that connects local artists to their community and travelers.

The following are features we find essential to this goal:

* Login authentication with Facebook, as well as the option for email authentication
* Geolocation technology- artwork displayed to user based on location
* Editing of art search preference settings (radius, price, type)
* The ability for users to respond (like dislike) art and add certain pieces to a queue for later viewing
* In app messaging
* A central place where users can display the art they have contributed to the app

The following are features we regard as wish-list components:

* In app purchases (PayPal)
* Video integration - we feel this will add a sense of authenticity to the app

## Backend

* Login + Signup using multiple different strategies
* Authentication protected submitting of posts
* Authentication protected editing of posts
* Viewing nearby posts based on Geolocation
* Including pictures in art postings
* 1 on 1 message posting and viewing in app
* Documented, easy, and automated server provisioning for transition after semester

## Front-end

We plan on supporting the following screens:

* Login
* Signup
* Discover
* Discover settings
* Art piece information
* My StorkFront
* My StorkFront settings
* My Bundle
* Create a post
* Message
* Message hub

We will spend the first two weeks (Sprint 1) planning out these screens; particularly finding the common threads between them and designing robust component classes that can be extended in the future to easily add new screens.

## Client side

We expect relatively few resources from the client.  Our app will be light on text and necessary images.  We have already received a first version of the logo.  In the future we will need:

* Icons (if the client prefers we not use third party open source image libraries)
* Names of screens (examples: StorkFront, My bundle)
* Artwork (images) to use as data to populate the app
* User testers (artists Edreys should know & business partners from Brian)
* Further clarifications as necessary

The two largest components of this list is the artwork and user testers.  We expect to get the artwork some time during the first sprint as Edreys should have images of his art readily available.   The testing component is described in greater detail below.

## Testing

We realize the user testers will require more effort from the clients to provide.  Ideally we would like to do user testing through the app development process.  We will notify the clients as soon as possible to put this in motion.  Reasonably we expect a pool of user testers by the end of Sprint 3 (when the core features of the app are complete).

We have broken the users into several groups, which can be viewed in the User stories section of the Project Design.  We would like several user testers from each group if possible.

# Sprint 1 (Mockup UI with Navigation) - Complete

We used the proto.io software to deliver create a UI that we believe showcases the desired functionality of the app.  This mockup UI can be accessed using the following [link](https://pr.to/JQDIB9/).


# Sprint 2 (Prototype- basic features) - 2 weeks
* Basic login/authentication
* Make post with text only (description, category, price)
* View posts in 'Discover' page (text only)
* View posts in 'My Storkfront' page (text only)
* Basic navigation between screens (create placeholders for all planned screens)

### Client side
* Names of screens

# Sprint 3 (Baseline Prototype- Prototype with core features) - 3 weeks
* MyBundle screen
* Post images with art posts
* Display images with art in Discover screen
* Ability to move artwork to MyBundle
* Art piece information screen
* Only see nearby posts based on geolocation
* Allow altering of account settings (i.e. MyStorkfront settings)

### Client side
* Icons (or approval of third party library if used)
* Artwork to use as data to populate the app

# Sprint 4 (Alpha- Partial functionality) - 2 weeks
* Filter posts based on category and price
* Facebook login option
* Robust sign-up process (e.g. additional signup details)
* Finalize login screen front-end
* Basic messaging (in-app)
* Allow the altering of geolocation settings (i.e. Discover screen settings)

### Client side
* Fields for account creation (what information is needed/desired from the user)
* Full list of Discover preferences and artwork categories

# Sprint 5 (Beta- Full functionality) - 3 weeks
* Editing posts
* Camera integration with creating/editing posts
* Messaging center/hub for artisan to view and organize incoming messages
* Incorporate push notifications
* Link social media account after creation

# Production (Robust Full Functionality) - 2 weeks
* Documented, easy, and automated server provisioning for transition after semester
