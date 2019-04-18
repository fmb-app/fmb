import React from 'react';
import beerCanIcon from '../../resources/images/icons8-beer-can-96.png';

const beerCanIcon = ({height, width, color}) => {
	return (
		<img
			src={beerCanIcon}
			alt='Beer can'
			heigth={height}
			width={width}
		/>
	);
}

export default beerCanIcon;