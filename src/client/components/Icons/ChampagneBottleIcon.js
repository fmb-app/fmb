import React from 'react';
import champagneBottleIcon from '../../resources/images/icons8-champagne-bottle-filled-100.png';

const ChampagneBottleIcon = ({height, width, color}) => {
	return (
		<img
			src={champagneBottleIcon}
			alt='Champagne bottle'
			heigth={height}
			width={width}
		/>
	);
}

export default ChampagneBottleIcon;