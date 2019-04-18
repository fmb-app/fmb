# FindMyBork
## About the project
A webapp that finds the shortest commute to a Systembolaget in order to buy beverages. The user should be able to request a specific beverage and the webapp will give the closest systembolag that has that specific beverage.


### Frameworks:
 * React
 * Node.js.
 * Express

### API to be used:
 * ​www.systembolaget.se/api​
 * www.trafiklab.se
 * Google Maps Places API

### Data to be used:
From the Trafiklab API we will get the route to the closest Systembolaget. From the Systembolaget API we will get the available beverages and stores. Local data will be the position and input from the user, such as beverage choice.

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
 
  3. We need to use the Trafiklabbet API to calculate the travel route to the selected store.

### Frontend

 1. We need to implement drag'n'drop search on the frontend.

 2. A page with favorite search terms.

 3. A map with the route to the selected systembolaget.
 
 4. We need to display the top choices for stores with the selected beverage.

## Project Structure
The project is divided into two parts, the client and the server. Both folders reside in the src folder. The client is built separately and will be bundled into a /dist folder that is served statically by the backend. The database is based on MongoDB, using the ODM library Mongoose. 

### Server

 * server.mjs: This is where the Express app is initiated, and the routes are directed to their respective files.
 * /api: This is where we put all our API calls(Google API and Systembolaget API)
  - google.mjs: This is where we fetch the 20 closest stores.
  - bolaget.mjs: This is where we connect to Systembolagets API to load Products and Stores.
 * /models: This is where we put our Mongoose.js models(products and stores)
  - products.mjs: This is where the Product model is configured.
  - stores.mjs: This is where the Store model is configured.
 * /routes: This is where we put our Express routes.
  - index.mjs: The main API route.

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

### Root

 * .babelrc: The config file for Babel
 * .env: Our environment variables.
 * .gitignore: Files to ignore on git.
 * package.json: node dependencies and project configuration
 * webpack.config.js: webpack config

 ### Public
 * favicon.png: our favicon
 * index.html: the main index file. This is where the app entry point is defined.

## How to setup
 * Clone the repo from Github.
 * Run `npm install` from the root directory of the project to install necessary Node dependencies.
 * Set up a MongoDB server and save the MONGO_DB_URI to a `.env` file in the project directory.
 * Generate API keys for Google Places API, Trafiklab v3 and save them in the `.env` file.
 * Deploy to Heroku or other hosting service.
