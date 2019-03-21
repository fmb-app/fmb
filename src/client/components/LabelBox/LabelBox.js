import React from 'react';
import { themes } from '../../themes/Themes';

const style = {
	box: {
		// paddingTop: themes.standardSpace,
		// paddingBottom: themes.standardSpace,
		// paddingLeft: themes.mediumSpace,
		// paddingRight: themes.mediumSpace,
		borderRadius: themes.standardRadius,
		height: '3rem',
		backgroundColor: 'red',
		textAlign: 'center',
	}
}

const LabelBox = ({label}) => {
	return (
		<div style={style.box}>
			{label}
		</div>
	);
}

export default LabelBox;