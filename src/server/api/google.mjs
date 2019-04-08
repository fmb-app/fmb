'use strict'
import fetch from "node-fetch";
const httpOptions = {
  headers: { "key": process.env.GOOGLE_API}
};

export const googleFetch = (lat, long, pageToken = "") => {
  return fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + ","
   + long + "&name=systembolaget&rankby=distance&key=" + process.env.GOOGLE_API + "&pagetoken=" + pageToken)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}
