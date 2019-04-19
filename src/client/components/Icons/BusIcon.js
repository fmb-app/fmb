import React from 'react';
import busIcon from '../../resources/images/busIcon.svg';

const BusIcon = ({height, width, color}) => {
	return (
		<img
			src={busIcon}
			alt='Map'
			heigth={height}
			width={width}
		/>
	);
}

export default BusIcon;