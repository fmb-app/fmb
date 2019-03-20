'use strict'
import fetch from "node-fetch";

export const googleFetch = (long, lat) => {
  fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + long + "," + lat + "&name=systembolaget&&key=")
    .then((res) => answer = JSON.stringify(res))
}
