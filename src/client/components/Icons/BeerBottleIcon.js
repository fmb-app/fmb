import React from 'react';
import beerBottleIcon from '../../resources/images/icons8-beer-bottle-96.png';

const BeerBottleIcon = ({height, width, color}) => {
	return (
		<img
			src={beerBottleIcon}
			alt='Beer bottle'
			heigth={height}
			width={width}
		/>
	);
}

export default BeerBottleIcon;