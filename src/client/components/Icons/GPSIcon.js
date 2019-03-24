import React from 'react';
import targetIcon from '../../resources/images/targetIcon.svg';

const GPSIcon = ({height, width, color}) => {
	return (
		<object 
			type='image/svg+xml'
			data={targetIcon}
			alt='GPS'
			heigth={height}
			width={width}
		/>
	);
}

export default GPSIcon;