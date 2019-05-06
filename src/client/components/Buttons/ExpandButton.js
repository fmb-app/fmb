import React from 'react';
import ExpandArrowIcon from '../Icons/ExpandArrowIcon';

const buttonStyle = rotated => {
	return {
		transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
		transition: 'transform .2s ease-in-out',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxSizing: 'border-box',
	}
};

const ExpandButton = ({rotated, onClick}) => {
	return (
		<div 
			style={buttonStyle(rotated)}
		>
			<ExpandArrowIcon
				width='2rem'
				height='1rem'
				onClick={onClick}
			/>
		</div>
	);
}

export default ExpandButton;