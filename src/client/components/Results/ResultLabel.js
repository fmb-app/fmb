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
	addressName: {

	},
	addressStreet: {
		fontVariant: 'all-small-caps',
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
	day: {
		fontWeight: '600',
	},
	time: {
		fontWeight: '400',
	}
};

const openingHours = (result, daysFromToday) => {
	const date  = moment().add(daysFromToday, 'd').format('YYYY-MM-DD');
  const open  = result.openingHours[date] && result.openingHours[date].from || '';
  const close = result.openingHours[date] && result.openingHours[date].to   || '';

  return close === '00:00' ? 'Stängt' : open + ' - ' + close;
}

const ResultLabel = ({result}) => {
	return (
		<div style={style.top}>
			<div style={style.address}>
				<h3 style={style.addressName}>
					{result.name || result.street}
				</h3>
				<h4 style={style.addressStreet}>
					{result.name ? result.street : result.city}
				</h4>
			</div>
			<div style={style.openingHours}>
				<h4 style={style.timeHeading}>
					Öppettider
				</h4>
				<p style={style.day}>Idag: <span style={style.time}>{openingHours(result, 0)}</span></p>
				<p style={style.day}>Imorgon: <span style={style.time}>{openingHours(result, 1)}</span></p>
			</div>
		</div>
	)
}

export default ResultLabel;