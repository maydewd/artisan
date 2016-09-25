# Artisan- Project Design

Ryan St.Pierre, David Maydew, Sung-Hoon Kim

# Overall Design and Feature Scope

Overall this app intends to create a market for travelers and art lovers to buy local art.

The project will deliver:
* Login through Facebook and Instagram or the ability to create an account through email.
* Geo-location technology.
* Internal messaging between artists and users.
* Ability to link internally to PayPals.
* The following screens/capabilities
  * Place where users can browse art based on geo-location and add art to their "bundle"
  * Place to view the bundle of selected art, where the user can view the art piece in greater detail
  * User profile
  * Artist profile (complete with photos and videos)

The project will not deliver:
* A comprehensive internal messaging application
* Customizable views


### Functionality

The app is designed with two central users in mind: artists and art consumers (see User Stories for more in depth list).  As an artist, one of our clients has given necessary functionality to protect and benefit the artists.  This includes the ability for in app payment and a required deposit before on-order art is made.  

We have also considered functionality to protect the user.  The inclusion of video into the app where artists can upload videos of their artistic process will allow consumers to better authenticate the art they buy.

### Quality

We conveyed to our clients that there is a tradeoff between quality and quantity of what can be accomplished.  The clients conveyed there are several areas they are willing to sacrifice quality in order to allow us to create more feature.  These include: messaging and payment.  The clients expressed the messaging app can be primitive (no audio or image sending) and are flexible to the payment method linking directly to PayPal.  However, it also needs to be noted both these features are considered essential.

### Database

We discussed with the clients that it is expected we used our own server (through Duke OIT) to house data during this semester.  As the end of the semester approaches we will help more this data to an Amazon AWS server the clients already have.  Once the data is transferred the cost will depend on the traffic the app receives.

# Design Goals

From an overall perspective, the main priority of the app is to streamline the transaction process between buyers and sellers, and enable a unique discovery pipeline for potential customers. This dichotomy is at the core of the app, and defines two distinct processes that interact with each other. As such, each one should be designed in such a way that they are flexible to changes in the other. As an example, a change in the navigational flow for posting an art piece should not impact the navigational flow of a user searching to buy art.

Looking at the semester overall, the features we view as essential or add-ons are covered in the first section of the document. To drill a bit deeper, the core functionality for a customer contains three qualities: Search for local artwork, select which artwork he/she is most interested, and communicate with the seller to finalize the transaction. From the artisan point of view, the core of the app is as follows: Authenticate through social media, post artwork listing with information/description, receive communication from potential buyers. 

To accomplish this core functionality, we will need a database that maintains art listings with location information along with channels to retrieve this information based on geography. Once this database is established, any changes to how the listings are stored could cause disruption in the algorithms that return nearby artwork listings to customers. As such, this is an area that will be given a lot of focus before jumping into an implementation. 

One other portion of the app that will be difficult to modify once fully implemented is the registration flow. Since one of the requirements for the app is that it allow for email-based authentication and social media authentication, there will have to be a rigid set of guidelines that allow us to handle both cases in the registration flow. For example, in one case we may prompt the user to enter a name and photo, whereas in the other we may pull that directly from the social profile. 

Given some level of proficiency with React Native, it should be relatively easy to modify the layout of individual app screens as well as the responsibilities of each app screen. Since the main brunt of the data manipulation is done on the server, this means the React Native app is serving more as a 'view' layer. As such, the infrastructure should be flexible enough to allow for modifications to the React Native app without needing to modify the back-end (not including major feature additions).

Since the app will rely on the remote server to function, the client will have to continue to power that server in the future. If no changes need to be made, this step should be relatively easy given the ubiquity of cloud service providers presently. 

# Impact

There are a number of options available for individual artisans who are looking to sell their works, ranging from Etsy to Craigslist, but we feel that all of them lack a sense of personality and authenticity - you browse a website and order items which may or may not actually be handmade, and they are delivered straight to your home. What we hope to achieve with Stork'd is an experience that is more personal for both consumer and artisan.  

Currently, if someone who is traveling decides they want to buy a local artwork as a souvenir, they might go to a gift shop and get some unoriginal trinket. However, with Stork'd, they can find a specific, unique piece of art in the local area, and interact directly with the artisan who made it. Not only does this add a sense of authenticity to the souvenir, the discovery of the item and the transaction become a unique, memorable experience.  

For the artisan, Stork'd provides a way to build a local presence and connect with the local community. The app will provide a quick and easy way to sell goods: the artisan just takes a picture on their phone and adds a price and appropriate tags.

# User Stories

### Professional Artist (Power User)

As a professional artist I can create a profile displaying any images of art I have made, plans for art I can custom make, and videos of my artistic process that I desire. These postings will be viewed by local users/travelers who will be able to contact me directly through the app. Additionally, I will be able to create a profile describing my specialties and any other information I feel relevant about my career that users will be able to access.

### Amateur Artist

I will be able to post some of my artwork, which I consider a passion more than a primary career, on the app.  The app will allow me to share this interest I have with others.  Based on the interest I might consider taking art more seriously.   Also, this app will provide me a door into the art community, connecting me to other artists as well as allowing me to view other art pieces for inspiration.

### Traveler

I will use the app when I travel to connect me to local artists.  I will search the app for items I am interested, connect directly to the artists, and leave the trip with an art piece I love.

### Art Enthusiast (Power User)

I will use the app to make constant purchases.  I may be an art curator or own a storefront that sells independent art.  Thus, my primary purpose is the purchase of art and possibly fostering long term **business** relationships with artists.

### Casual Local Art Consumer

I am not a curator or traveler but like to check out unique, local art items.  I will spend most of my time on the app browsing, only purchasing the items I like a lot.  I might also browse the app to find cool art works to share with my friends (through pictures or social media means).

# Dependencies

The major dependencies of the project have to do with React-Native. This is the main piece of software we are using to develop the app, and will have a bit of a learning curve since none of us developers have used it before. Since we are building this project from the ground up, the client is not responsible for delivering any back-end integration or database functionality (we will get to build that ourselves). The primary deliverable from the client to us is graphic UI elements, such as logos, images, and color scheme. In addition, the client is responsible for providing feedback on each iteration of the app primarily from the artisan point of view. This is a point of view that is hard to capture from our end as developers, but one that the clients have experience with.

# Concerns

We as developers are still in the process of learning some of the technologies we plan to use for the development of the app. Therefore, the client should be aware that our estimates for how quickly we can implement certain features may turn out to be off simply due to lack of experience.  

There are privacy concerns with storing and using location data; particularly, we will need to be careful with how we show the location of an artisan.  

It could be tricky to handle account authentication for both third-party social media accounts and accounts created in Stork'd.  

# Team Organization

We plan on rotating roles every sprint (approx. every 2 weeks).  However, a description of the initial plan for the structure of the team is included below.

## Business Analyst: Ryan St.Pierre

As business analyst Ryan will be the main point of contact with the clients.  He will draft all e-mails (including agendas) and coordinate meeting times.  Coordination also includes the exchanging of resources, both from clients to dev team and dev team to clients. It is also Ryan's focus to ensure the clients' desires are proper communicated and represented to the team.  

*Note: Although Ryan is currently assigned as Business Analyst the client should feel comfortable reaching out to any of the team members*

## Technical Lead: David Maydew
*secondary - Sung-Hoon Kim*

David Maydew should be the point of contact for any technical questions.  Any question from the clients starting with "How feasible is it to..." should be directed to David.  

David should also do the research on the best approach for technical solutions.  He should organize the approach and direct the rest of the team regarding technical decisions (after considering his research and input from the rest of the team).

*Note: We feel that the technical aspects of this project can consume a lot of time.  We feel investigating solutions for social media & PayPal incorporation could be particularly time consuming.  For this reason we have designated Sung-Hoon as the secondary to this role.  His main role is to aid in the research of multiple solutions*

## Scrum Master: Ryan St.Pierre

Ryan's job to ensure the team is on task with regard to the Sprint plan drafted prior to the Sprint. This includes reaching out to the necessary resources when roadblocks are encountered.

## Quality Assurance: Sung-Hoon Kim

The clients should reach out to Sung-Hoon regarding any questions on the robustness or completeness of a certain feature.  Sung-Hoon should be aware of all current known bugs and draft solutions for their resolution.

**Back-end vs Front-end**

David Maydew has the most experience with setting up a server/database system.  For this reason he will be responsible for taking point on setting up the server, database, and the proper connections.  Sung-Hoon has experience with Javascript and will take point on the front-end.
