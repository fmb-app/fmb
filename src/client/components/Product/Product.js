import React, { useState } from 'react';
import { themes } from '../../themes/Themes';

const productStyle = isSelected => {
	return {
		padding: themes.standardSpace,
		borderRadius: themes.standardRadius,
		backgroundColor: isSelected ? 'blue' : 'red',
		marginTop: themes.smallSpace,
		height: '2rem',
		overflow: 'hidden',
	  whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		boxSizing: 'border-box',
		display: 'flex',
		alignItems: 'center',
	}
}

const Product = ({label, altLabel, onClick, isSelected}) => {
	const productLabel = () => {
		if (altLabel !== null) {
			return label + ' - ' + altLabel;
		} else {
			return label;
		}
	}

	return (
		<div
			style={productStyle(isSelected)}
			onClick={onClick}
		>
			<p>{productLabel()}</p>
		</div>
	);
}

export default Product;
