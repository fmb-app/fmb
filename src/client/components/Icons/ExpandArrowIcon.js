import React from 'react';
import expandArrow from '../../resources/images/expandArrow.svg';

const svgStyle = (width, height) => {
	return {
		width: width,
		height: height
	}
}

const ExpandArrowIcon = ({height, width, color, onClick}) => {
	return (
		<img 
			src={expandArrow}
			alt='Arrow'
			style={svgStyle(width, height)}
			onClick={onClick}
		/>
	);
}

export default ExpandArrowIcon;