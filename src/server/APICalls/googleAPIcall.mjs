'use strict'
import fetch from "node-fetch";
const httpOptions = {
  headers: { "key": process.env.GOOGLE_API}
};

export const googleFetch = (lat, long, offset = 0) => {
  return fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&name=systembolaget&rankby=distance&key=" + process.env.GOOGLE_API)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}
