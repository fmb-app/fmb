import React from 'react';
import trainIcon from '../../resources/images/trainIcon.svg';

const TrainIcon = ({height, width, color}) => {
	return (
		<img
			src={trainIcon}
			alt='Map'
			heigth={height}
			width={width}
		/>
	);
}

export default TrainIcon;