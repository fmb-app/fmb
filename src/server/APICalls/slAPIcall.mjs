'use strict'
import fetch from "node-fetch";
const httpOptions = {
  headers: { "key": process.env.SL_API}
};

export const slFetch = () => {			//long, lat, offset = 0) => {
	return fetch("https://api.sl.se/api2/TravelplannerV3_1/trip.json?key=<KEY>&lang=se&originExtId=TCE&destExtId=9111&maxChange=3&lines=!19")
  // return fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + long + "," + lat + "&name=systembolaget&rankby=distance&key=" + process.env.GOOGLE_API)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}
