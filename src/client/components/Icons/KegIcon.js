import React from 'react';
import kegIcon from '../../resources/images/icons8-wooden-beer-keg-filled-100.png';

const KegIcon = ({height, width, color}) => {
	return (
		<img
			src={kegIcon}
			alt='Keg'
			height={height}
			width={width}
		/>
	);
}

export default KegIcon;