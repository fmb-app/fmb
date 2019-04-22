import React from 'react';
import clockIcon from '../../resources/images/icons8-clock-filled.svg';

const ClockIcon = ({height, width, color}) => {
	return (
		<img
			src={clockIcon}
			alt='Clock'
			height={height}
			width={width}
		/>
	);
}

export default ClockIcon;
