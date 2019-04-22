import React, {useState} from 'react';
import ExpandButton from '../Buttons/ExpandButton';
import { themes } from '../../themes/Themes';
import Radium from 'radium'

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		boxShadow: '0 0 5px 5px #000000',
		marginTop: themes.standardSpace,
		borderRadius: themes.standardRadius,
		backgroundColor: '#262632',
	},
	top: {
		width: '100%',
		padding: themes.standardSpace,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		boxSizing: 'border-box',
		':hover': {
			cursor: 'pointer',
			backgroundColor: '#363642'
		}
	}
};

const Top = ({style, label, expand, isExpanded}) => {
	return (
		<div style={style} onClick={expand}>
			<h3>{label}</h3>
			<ExpandButton rotated={isExpanded} />
		</div>
	)
}

const StyledTop = Radium(Top);

const ExpandableContainer = ({label, children, styleProps}) => {
	const [expanded, setExpanded] = useState(false);

	const expandedStyle = {
		transition: 'height 0.5s ease-in-out',
		height: expanded ? '10rem' : '0rem',
		overflowY: 'auto'
	}

	return (
		<div style={style.container}>
			<StyledTop
				style={{...style.top, ...styleProps}}
				expand={() => { setExpanded(!expanded)}}
				label={label}
				isExpanded={expanded}
			/>
			<div style={expandedStyle}>
				{ expanded && children }
			</div>
		</div>
	);
}

export default ExpandableContainer;
