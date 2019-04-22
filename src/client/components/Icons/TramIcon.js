import React from 'react';
import tramIcon from '../../resources/images/tramIcon.svg';

const TramIcon = ({height, width, color}) => {
	return (
		<img
			src={tramIcon}
			alt='Map'
			height={height}
			width={width}
		/>
	);
}

export default TramIcon;