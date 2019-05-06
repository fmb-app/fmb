import React from 'react';
import cartIcon from '../../resources/images/cartIcon.svg';

const svgStyle = (width, height) => {
	return {
		width: width,
		height: height
	}
}

const CartIcon = ({height, width, color, onClick}) => {
	return (
		<img
			src={cartIcon}
			alt='Arrow'
			style={svgStyle(width, height)}
			onClick={onClick}
		/>
	);
}

export default CartIcon;
