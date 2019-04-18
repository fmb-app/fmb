mport React from 'react';
import wineBottleIcon from '../../resources/images/icons8-wine-bottle-filled-100.png';

const MapIcon = ({height, width, color}) => {
	return (
		<img
			src={wineBottleIcon}
			alt='Wine bottle'
			heigth={height}
			width={width}
		/>
	);
}

export default WineBottleIcon;