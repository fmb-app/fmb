import React, { useState, useEffect } from 'react';
import { themes } from '../../themes/Themes';
import moment from 'moment';

const style = {
	top: { 
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	address: {

	},
	openingHours: {
		display: 'flex',
		flexFlow: 'column nowrap',
		fontSize: '0.6rem',
		alignItems: 'flex-end',
	},
	timeHeading: {
		fontWeight: '800',
		fontVariant: 'all-small-caps',
		fontSize: '1rem',
	},
	time: {
		fontWeight: '600',
	}
};

const openingHours = (result, daysFromToday) => {
	const date  = moment().add(daysFromToday, 'd').format('YYYY-MM-DD');
  const open  = result.openingHours[date] && result.openingHours[date].from || '';
  const close = result.openingHours[date] && result.openingHours[date].to   || '';

  return close === '00:00' ? 'Stängt' : open + ' - ' + close;
}


const ResultLabel = ({result}) => {
	const [timeToday,    setTimeToday] 	  = useState('');
	const [timeTomorrow, setTimeTomorrow] = useState('');

	useEffect(() => {
		setTimeToday(openingHours(result, 0));
		setTimeTomorrow(openingHours(result, 1));
	}, []);

	return (
		<div style={style.top}>
			<div style={style.address}>
				<h3>
					{result.name || result.street}
				</h3>
			</div>
			<div style={style.openingHours}>
				<h4 style={style.timeHeading}>
					Öppettider
				</h4>
				<p>Idag: <span style={style.time}>{timeToday}</span></p>
				<p>Imorgon: <span style={style.time}>{timeTomorrow}</span></p>
			</div>
		</div>
	)
}

export default ResultLabel;