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
A lot of time and effort was spent on setting up the project. Initializing the project with Node, React, Webpack and Babel as well as deploying it to Heroku. Troubleshooting was tedious when we tried deploying, but it is finally up and running!

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

### Frontend

 1. We need to implement drag'n'drop search on the frontend.

## Project Structure

