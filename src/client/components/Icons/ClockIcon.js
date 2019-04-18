import React from 'react';
import clockIcon from '../../resources/images/icons8-clock-filled.svg';

const clockIcon = ({height, width, color}) => {
	return (
		<img
			src={clockIcon}
			alt='Clock'
			heigth={height}
			width={width}
		/>
	);
}

export default clockIcon;