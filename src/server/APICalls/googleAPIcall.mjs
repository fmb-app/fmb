'use strict'
import fetch from "node-fetch";
const httpOptions = {
  headers: { "key": process.env.GOOGLE_API}
};

export const googleFetch = (long, lat) => {
  fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + long + "," + lat + "&name=systembolaget&rankby=distance&key=" + process.env.GOOGLE_API)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}
