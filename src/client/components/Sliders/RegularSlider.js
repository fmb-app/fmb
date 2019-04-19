import React, {useState, useEffect, useContext} from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes';

const style = {
	slider: {
		width: '100%',
		height: '1rem',
		background: '#d3d3d3',
	}
}

const RegularSlider = () => {
	return (
		<input 
			type="range"
			min="1"
			max="100"
			id="myRange"
			style={style.slider}
		/>
	);
}

export default RegularSlider;