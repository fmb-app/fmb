import React from 'react';
import closeIcon from '../../resources/images/closeIcon.svg';

const svgStyle = (width, height) => {
	return {
		width: width,
		height: height
	}
}

const CloseIcon = ({height, width, onClick}) => {
	return (
		<img 
			src={closeIcon}
			alt='Arrow'
			style={svgStyle(width, height)}
			onClick={onClick}
		/>
	);
}

export default CloseIcon;