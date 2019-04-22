import React from 'react';
import { themes } from '../../themes/Themes';
import Radium from 'radium';

const style = {
	productStyle: (isSelected) => {
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
			':hover': {
				backgroundColor: isSelected ? '#845263' : '#363642',
				cursor: 'pointer'
			}
		}
	},
	label: {
		width: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		textAlign: 'left'
	},
	volume : {
		display: 'flex',
		fontSize: '0.6rem',
		alignItems: 'flex-end'
	}
}

const Product = ({label, altLabel, onClick, isSelected, icon, volume}) => {
	const productLabel = () => altLabel !== null ? label + ' - ' + altLabel : label;

	return (
		<div style={style.productStyle(isSelected)} onClick={onClick}>
			<div style={style.label}>{productLabel()} </div>
			<span style={style.volume}>
				{volume / 10}cl{icon}
			</span>
		</div>
	);
}

export default Radium(Product);
