import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import FmbContext from '../../context/FmbContext';
import { themes } from '../../themes/Themes';

const style = {
	container: {
		width: '100%',
		boxSizing: 'border-box',
		borderRadius: themes.standardRadius,
		padding: themes.standardSpace,
		display: 'grid',
		gridTemplateRows: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
	},
	stop: {
		padding: 'none',
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
          const trip = travelRoutes.Trip[0].LegList.Leg;
          setTrips({trip: trip, time: getTravelTime(trip[0].Origin.time, trip[trip.length-1].Destination.time)});

        })
    )
}

const getTravelTime = (startTime, endTime) => {
	const start = moment.utc(startTime, "HH:mm:ss");
	const end = moment.utc(endTime, "HH:mm:ss");
	if (end.isBefore(start)) end.add(1, 'day'); // account for crossing over to midnight the next day
	const diff = moment.duration(end.diff(start));
	return moment.utc(+diff).format('mm');
}

const TravelRoute = ({store}) => {
	const context = useContext(FmbContext);
	const [trips, setTrips] = useState({});

	useEffect(() => {
		getTravelRoute(context.location.lat, context.location.long, store.location.coords, setTrips);
	}, [])

	return (
		<div style={style.container}>
			<div>
				<span>{trips.time && trips.time} min till {store.street}</span>
			</div>
			{
				trips.trip && trips.trip.map((partOfTrip, index) => 
					<div style={style.stop} key={`trip-${index}`}>
						<div>{partOfTrip.Origin.time.slice(0, 5)}</div>
						 {partOfTrip.Origin.name} till {partOfTrip.Destination.name} {partOfTrip.type} {partOfTrip.Product && partOfTrip.Product.name} {partOfTrip.duration} 
					</div>
				)
			}
		</div>
	);
}

export default TravelRoute;