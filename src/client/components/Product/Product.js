import React, { useState } from 'react';
import { themes } from '../../themes/Themes';

const style = { 
	card: {
		padding: themes.standardSpace,
		borderRadius: themes.standardRadius,
		backgroundColor: 'red',
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

const Product = ({label, altLabel}) => {
	const productLabel = () => {
		if (altLabel !== null) {
			return label + ' - ' + altLabel;
		} else {
			return label;
		}
	}

	return (
		<div style={style.card}>
			<p>{productLabel()}</p>
		</div>
	);
}

export default Product;