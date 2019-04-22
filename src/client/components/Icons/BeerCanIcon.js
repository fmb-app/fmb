import React from 'react';
import beerCanIcon from '../../resources/images/icons8-beer-can-96.png';

const BeerCanIcon = ({height, width, color}) => {
	return (
		<img
			src={beerCanIcon}
			alt='Beer can'
			height={height}
			width={width}
		/>
	);
}

export default BeerCanIcon;
