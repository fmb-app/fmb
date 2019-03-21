import React, {useState, useEffect, useContext} from 'react';
import FmbContext from '../../context/FmbContext';
import RegularInputField from '../InputFields/RegularInputField';
import RegularButton from '../Buttons/RegularButton';
import HorizontalDivider from '../Dividers/HorizontalDivider';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		width: '80%',
		height: '70%',
		marginTop: '7rem',
		textAlign: 'left',
		paddingTop: themes.mediumSpace,
		paddingBottom: themes.mediumSpace,
		paddingLeft: themes.mediumSpace,
		paddingRight: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		overflowY: 'auto',
	},
	row: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		boxSizing: 'border-box',
	},
	heading2: {
		paddingBottom: themes.mediumSpace,
		color: themes.standardTextColor,
	}
}

const MidSection = () => {
	const context = useContext(FmbContext);

	return (
		<div style={style.midSection}>
		<h2 style={style.heading2}>Resultat:</h2>
		<pre style={{color: 'white'}}>{JSON.stringify(context)}</pre>
		</div>
	);
}

export default MidSection;