import React from 'react';
import whiskeyBottleIcon from '../../resources/images/icons8-whiskey-64.png';

const WhiskeyBottleIcon = ({height, width, color}) => {
	return (
		<img
			src={whiskeyBottleIcon}
			alt='Whiskey bottle'
			heigth={height}
			width={width}
		/>
	);
}

export default WhiskeyBottleIcon;