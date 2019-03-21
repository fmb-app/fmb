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

We spent countless hours on the design of the frontend. The client is a React app, created only with functional components, using context hooks instead of Redux for state management.

## What we plan to do

### Backend
On the backend we have some things left to figure out. 

 1. We need to connect the clients' request of some product nr's to those stores that sell them, and find the intersection of those stores and the list of the closest stores we retrieve from the Google Places API.

 2. We need to create some endpoints serving the different categories of beverages that the user should be able to search for, which will make it easier for the frontend to filter through products to search for.
 
  3. We need to use the Trafiklabbet API to calculate the travel route to the selected store.

### Frontend

 1. We need to implement drag'n'drop search on the frontend.
 
 2. We need to display the top choices for stores with the selected beverage.
 
 3. We need to display the travel route to the selected store.

## Project Structure
The project is divided into two parts, the client and the server. Both folders reside in the src folder. The client is built separately and will be bundled into a /dist folder that is served statically by the backend.

The project is divided into frontend, backend and database. For easier deployment in Heroku, the frontend and backend are both put in their respective folder in the src folder. The database is based on MongoDB, using the ODM library Mongoose. In the frontend (client) folder, resources contains resources such as images, themes contains some genereal CSS, components contain the components with the js, html and CSS combined in one file for each component, and context contains files regarding the context. The backend (server) folder contains the files for API calls and interaction with the database.

### Server

 * server.mjs: This is where the Express app is initiated, and the routes are directed to their respective files.
 * /APICalls: This is where we put all our API calls(Google API and Systembolaget API)
  - googleAPIcall.mjs: This is where we fetch the 20 closest stores.
  - bolaget.mjs: This is where we connect to Systembolagets API to load Products and Stores.
 * /models: This is where we put our Mongoose.js models(products and stores)
  - products.mjs: This is where the Product model is configured.
  - stores.mjs: This is where the Store model is configured.
 * /routes: This is where we put our Express routes.
  - index.mjs: The main API route.

### Root

 * .babelrc: The config file for Babel
 * .env: Our environment variables.
 * .gitignore: Files to ignore on git.
 * package.json: node dependencies and project configuration
 * webpack.config.js: webpack config

 ### Public
 * favicon.png: our favicon
 * index.html: the main index file. This is where the app entry point is defined.
