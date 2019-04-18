'use strict'
import fetch from "node-fetch";

export const slFetch = (startLat, startLong, destLat, destLong) => {
	console.log("slapi: https://api.sl.se/api2/TravelplannerV3/trip.json?key="+ process.env.SL_API_3 +
		"&lang=se&originCoordLat=" + startLat + "&originCoordLong=" + startLong + "&destCoordLat=" + destLat + "&destCoordLong=" + destLong);
	return fetch("https://api.sl.se/api2/TravelplannerV3/trip.json?key="+ process.env.SL_API_3 +
		"&lang=se&originCoordLat=" + startLat + "&originCoordLong=" + startLong + "&destCoordLat=" + destLat + "&destCoordLong=" + destLong)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

