# FindMyBork
## About the project
A webapp that finds the shortest commute to a systembolaget in order to buy non-alcoholic beverages. One should be able to request a specific beverage and it will give the closest systembolag that has that specific beverage.


### Frameworks:
 * React
 * Node.js.

### API to be used:
 * ​www.systembolaget.se/api​
 * www.trafiklab.se

### Data to be used:
From the Trafiklab API we will get the route to the closest Systembolaget. From the Systembolaget API we will get the available beverages. Local data will be the position and input from the user, such as beverage choice.

## What we have done so far

### Setting up the project
A lot of time and effort was spent on setting up the project. Initializing the project with Node, React, Webpack and Babel as well as deploying it to Heroku. Troubleshooting was tedious when we tried deploying, especially getting ES6 syntax to work. Eventually we got it to work and now it is up and running!

### Systembolaget's API
We spent a lot of time on getting data from Systembolaget's API, as it is not really an API in the common sense, but rather 3 .xml (?!) files containing the Products, Stores, and which Products are in Stock in all Stores.

Eventually we were able to parse the .xml files and store the Products and Stores in a MongoDB database. 

### Google Places API

We figured out how to use Google Places API to locate the closest Systembolaget stores from a given location. We can query the backend for these.

### Building the React frontend

We don't use classes in our frontend, instead each component is purely functional. In order to avoid passing state down as props, we use a global state with a context. Each component are made to be as reusable as possible.

## What we plan to do

### Backend
On the backend we have some things left to figure out. 

 1. We need to connect the clients' request of some product nr's to those stores that sell them, and find the intersection of those stores and the list of the closest stores we retrieve from the Google Places API.

 2. We need to create some endpoints serving the different categories of beverages that the user should be able to search for, which will make it easier for the frontend to filter through products to search for.

### Frontend

 1. We need to implement drag'n'drop search on the frontend.

 2. A page with favorite search terms.

 3. A map with the route to systembolaget.

## Project Structure

The project is divided into two parts, the client and the server. Both folders reside in the src folder. The client is built separately and will be bundled into a /dist folder that is served statically by the backend.


### Server

 * server.mjs: This is where the Express app is initiated, and the routes are directed to their respective files.
 * /APIcalls: This is where we put all our API calls(Google API and Systembolaget API)
 * /models: This is where we put our Mongoose.js models(products and stores)
 * /routes: This is where we put our Express routes (currently only API route.)

### Client
 * App.js: Root application.
 * index.js: Loads App.js
 * index.css: Styling that should take effect on all components.
 * /components: This is where we put all components, each component is put in the responding directory.
 	- BottomNavBar: A navigation bar.
 	- RegularButton.js: A button.
 	- HorizontalDivider.js: A divider for dividing elements.
 	- RegularInputField.js: An inputfield. 
 * /context: This is where the context is put.
 	- FmbContext.js: This is the context for the global state.
 	- GlobalState.js: This is the global state that is used by components.
 	- Reducer.js: A reducer for the state.
 * /resources: This is where images and other resources are put.
 	- background.svg: The background image.
 * /themes: This is where standard styling for components are stored, such as colors and whatnot.
 	- Themes.js: Contains an object with standard styling for the app.