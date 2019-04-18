import React from 'react';
import mapIcon from '../../resources/images/MapIcon.svg';

const MapIcon = ({height, width, color}) => {
	return (
		<img
			src={mapIcon}
			alt='Map'
			heigth={height}
			width={width}
		/>
	);
}

export default MapIcon;