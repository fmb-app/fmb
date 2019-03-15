import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
	midSection: {
		width: '80%',
		height: '60%',
		paddingTop: themes.standardSpace,
		paddingBottom: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
	}
}

const MidSection = () => {
	return (
		<div style={style.midSection}>
			
		</div>
	);
}

export default Radium(MidSection);