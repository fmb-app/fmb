import React from 'react';
import subwayIcon from '../../resources/images/subwayIcon.svg';

const SubwayIcon = ({height, width, color}) => {
	return (
		<img
			src={subwayIcon}
			alt='Map'
			height={height}
			width={width}
		/>
	);
}

export default SubwayIcon;