import React, { useState } from 'react';
import { themes } from '../../themes/Themes';

const productStyle = isSelected => {
	return {
		padding: themes.standardSpace,
		borderRadius: themes.standardRadius,
		backgroundColor: isSelected ? '#744253' : '#262632',
		marginTop: themes.smallSpace,
		height: '2rem',
		overflow: 'hidden',
	  whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	}
}

const Product = ({label, altLabel, onClick, isSelected, icon, volume}) => {
	const productLabel = () => {
		return (altLabel !== null) ? label + ' - ' + altLabel : label;
	}

	return (
		<div style={productStyle(isSelected)} onClick={onClick}>
			<p style={{width: '80%', textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'left'}}>{productLabel()} {volume}ml</p>
			{icon}
		</div>
	);
}

export default Product;
