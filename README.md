[![Build Status](https://travis-ci.org/themyth92/jschallenge.svg)](https://travis-ci.org/themyth92/jschallenge)

## Purpose
1. Car Park location will be drawn on the map when app has started. This app will retrieve from Smove server the Car Park list from tomorrow.
2. User can click on the marker on the map to book/change booking time on a particular Car Park.
3. User can only book a Car Park once a date.
4. User can see a list all booking car parks displayed as a table when navigate through the app using top navigation. From there they can also change/remove their booking.

## Setting up
1. *NODE* version >= 12.0.x is required. *NPM* version > 2.11.x is required.
2. Please run *npm install* to install all app dependancies. 
3. I use *grunt* for automate task in the app. If you dont have *grunt-cli* please install it usning *npm install -g grunt-cli*.
4. - *grunt build* for building production files
   - *grunt test* for unit test
5. You can run either *development* or *production* app. By default, production mode will be set.
   - *NODE_ENV=dev node app.js* for development
   - *NODE_ENV=prod node app.js* for production
6. Navigate to *localhost:3000* for starting the app.