# Artisan - Executive Summary

Ryan St.Pierre, David Maydew, Sung-Hoon Kim

## Overview

When people travel they love to immerse themselves completely in the culture, such as trying the local food and drink specialties.  When these travelers leave they like to take a piece of this culture with them, often in the form of a souvenir. Brian Anderson, a frequent traveler, was looking for a way to purchase meaningful items before leaving a destination; something nicer than cheap, unoriginal knick knacks.  From this desire the Stork'd was born.  Stork'd is a geo-location mobile application that connects local artisans with travelers and community consumers.  It will allow consumers to purchase hand-woven rugs from New Mexico, paintings from New York, and jewelry from the West Coast directly from local artists.

The Stork'd name comes from the concept of delivering a beautiful package.  The artisans, AKA the storks, will be able to share their craft and items directly with the consumer, allowing the consumer to get art pieces that are not only beautiful, but also have a face and story behind them.

## Target Users

This app will target two types of users: artists who are looking to sell goods that have a local theme, and consumers who are looking to purchase local artwork. The app will then render different artwork to different consumers based on geographic area. Given this target audience, the app must be easy enough to use for individuals with little to no technical experience. In addition, we want to target a wide variety of artisans, including both amateurs and professionals.  

## Value

This app has two main audiences: artists (sellers) and art lovers (consumers).  This app will attempt to unite these two groups in a mutually beneficial manner.

For artists, this app will provide an avenue for exposure and sales.  The app will provide artists a space to post their art, as well as their artistic process (in the form of pictures and videos).  Having a central collection of their work, in addition to the geo-location feature, will allow local artists to gain a following, leading to sales.  

For art lovers, this app will fill a missing market of local art, which is often hard to find. However, the app will also provide a place to view art and interact with artists.  This mix of social media and e-commerce will foster a strong relationship between artists and the local community, allowing art lovers to become more involved in the art scene as well as purchase unique, local art.

## Functionality

Users will be prompted to create a profile/account when first opening the app. All users will be able to create a consumer profile and browse artisans and pieces of art for free. For the consumer, the interface will mainly consist of a "discover" page, where users will be presented with local artworks one at a time. For each work, the user has the choice of ignoring it and moving onto the next work, or saving it to a queue for later inspection. This allows the user to quickly browse a large number of artworks and see what kinds of artisans are in the area. Later, the user can visit their queue to look at saved artworks in more detail - each artwork will have images, artisan information, and price listed. If the user finds an artwork they are interested in buying, they can use the artisan information provided to contact the artisan directly, or send a message to the artisan within the app.

A user can become a seller by paying some fee to upgrade their account, allowing them to create a seller profile. However, there will be a way to first try out the seller features without paying, so that the user can see whether or not selling on Stork'd is worth the investment. After creating a seller profile, the user is then allowed to put up works for sale - for each work, the seller uploads images and/or videos of the product and sets a price.

## Technical Recommendation

For our app, we recommend using React Native for the core development of the app, with a MySQL database. The client does not have a strong opinion on the technology used, though they envision their app as a mobile app first on iOS. We recommend React Native for this purpose because it is a modern framework that will allow for dual use on iOS and Android in the future. In addition, we are more familiar with using Javascript for development than any other mobile app languages. For this semester, the client should not face any costs, since we can use a Duke OIT managed VM to run the database server. When the semester ends, the main cost would simply be from running the server/database machine, which could be done through any cloud computing platform (AWS, Azure, etc.). It is hard to estimate the exact cost since that will depend on the number of users and activity, but it almost certainly would not exceed a few hundred dollars per year.  
