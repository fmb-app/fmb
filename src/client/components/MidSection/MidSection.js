import React, {useState, useEffect, useContext} from 'react';
import RegularInputField from '../InputFields/RegularInputField';
import RegularButton from '../Buttons/RegularButton';
import HorizontalDivider from '../Dividers/HorizontalDivider';
import ProductContainer from '../ProductContainer/ProductContainer';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		width: '80%',
		height: '70%',
		marginTop: '7rem',
		textAlign: 'left',
		padding: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		display: 'grid',
		gridTemplateColumns: 'auto auto',
		gridColumnGap: '1rem',
	},
}

const MidSection = () => {
	//const context = useContext(FmbContext);
	return (
		<div style={style.midSection}>
			<ProductContainer/>
			<ProductContainer/>
		</div>
	);
}

export default MidSection;