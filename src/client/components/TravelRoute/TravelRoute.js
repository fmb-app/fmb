import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import FmbContext from '../../context/FmbContext';
import { themes } from '../../themes/Themes';

const style = {
	container: {
		width: '100%',
		boxSizing: 'border-box',
		marginTop: themes.standardSpace,
		borderRadius: themes.standardRadius,
		// padding: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0,0.5)',
		display: 'grid',
		gridTemplateRows: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
	},
	stop: {
		// padding: themes.standardSpace,
	}
}


const getTravelRoute = (startLat, startLong, destination, setTrips) => {
  return (
    fetch(`/api/travel/${startLat}/${startLong}/${destination.lat}/${destination.long}`, {   
      method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json()) 
        .then((travelRoutes) => {
          console.log('sl: ', travelRoutes); 
          const trip = travelRoutes.Trip[0].LegList.Leg;
          setTrips({trip: trip, time: getTravelTime(trip[0].Origin.time, trip[trip.length-1].Destination.time)});

        })
    )
}

const getTravelTime = (startTime, endTime) => {
	const start = moment.utc(startTime, "HH:mm:ss");
	const end = moment.utc(endTime, "HH:mm:ss");
	if (end.isBefore(start)) end.add(1, 'day'); // account for crossing over to midnight the next day
	const d = moment.duration(end.diff(start));
	const time = moment.utc(+d).format('H:mm');
	return  time;
}

const TravelRoute = ({store}) => {
	const context = useContext(FmbContext);
	const [trips, setTrips] = useState({});

	useEffect(() => {
		getTravelRoute(context.location.lat, context.location.long, store.location.coords, setTrips);
		console.log('trip: ', trips);
	}, [])

	return (
		<div style={style.container}>
			Restid: {trips.time && trips.time}
			{
				trips.trip && trips.trip.map((partOfTrip) => 
					<div style={style.stop}>
						{partOfTrip.Origin.time} från {partOfTrip.Origin.name} till {partOfTrip.Destination.name} {partOfTrip.type} {partOfTrip.Product && partOfTrip.Product.name} {partOfTrip.duration} 
					</div>
				)
			}
		</div>
	);
}

export default TravelRoute;