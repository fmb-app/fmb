import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import FmbContext from '../../context/FmbContext';
import { themes } from '../../themes/Themes';
import BusIcon from '../Icons/BusIcon';
import WalkingIcon from '../Icons/WalkingIcon';
import SubwayIcon from '../Icons/SubwayIcon';
import TramIcon from '../Icons/TramIcon';
import TrainIcon from '../Icons/TrainIcon';
import ClockIcon from '../Icons/ClockIcon';


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
		display: 'flex',
		flexFlow: 'column nowrap',
		fontVariantCaps: 'all-small-caps'
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

const JourneySymbols = ({journey}) => {
	const getJourneyIcon = (categoryCode) => {
		switch (categoryCode) {
			case '1':
				return <SubwayIcon color='white' width='8px' />
			case '3':
				return <BusIcon color='white' width='8px' />
			default:
				return <TrainIcon color='white' width='8px' />
		}
	}

	const icon = journey.type === 'WALK' 
		? <WalkingIcon color='white' width='10px' height='10px'/>
		: getJourneyIcon(journey.Product.catCode);

	return (
		<div>
			{icon}
			<span style={{fontWeight: '600', marginLeft: '5px'}}>
				{ journey.Product
						? journey.Product.name
						: journey.duration.slice(2, journey.duration.length - 1) + ' min'
				}
			</span>
		</div>
	)
}

const TravelRoute = ({store}) => {
	const context = useContext(FmbContext);
	const [trips, setTrips] = useState({});

	useEffect(() => {
		getTravelRoute(context.location.lat, context.location.long, store.location.coords, setTrips);
	}, []);

	return (
		<div style={style.container}>


			{ trips.time &&
				<div style={{fontSize: '0.8rem'}}>
					<ClockIcon color='white' width='10px' height='10px' />
					<span style={{paddingLeft: '5px', fontWeight: '600'}}>
						{trips.time && trips.time} min
					</span>
					<span> till {store.street}:</span>
				</div>
			}
			{
				trips.trip &&
				trips.trip.map((journey, index) => 
					<div style={style.stop} key={`trip-${index}`}>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<div style={{fontWeight: '600'}}>{journey.Origin.time.slice(0, 5)} </div>
							<div>{journey && journey.Origin.name}</div>
						</div>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<JourneySymbols journey={journey} />
							<div>{journey && journey.Destination.name}</div>
						</div>
					</div>
				)
			}
		</div>
	);
}

export default TravelRoute;