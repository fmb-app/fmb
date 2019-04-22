import React from 'react';
import walkingIcon from '../../resources/images/walkingIcon.svg';

const WalkingIcon = ({height, width, color}) => {
	return (
		<img
			src={walkingIcon}
			alt='Map'
			height={height}
			width={width}
		/>
	);
}

export default WalkingIcon;