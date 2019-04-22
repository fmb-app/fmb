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
	top: (hover, expanded) => { 
		return {
			width: '100%',
			padding: themes.standardSpace,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			boxSizing: 'border-box',
			':hover': {
				cursor: 'pointer',
				backgroundColor: (hover || !expanded) && '#363642'
			}
		}
	}
};

const Top = ({style, label, subLabel, expand, isExpanded, labelStyle, subLabelStyle}) => {
	return (
		<div style={style} onClick={expand}>
			<div>
				<div style={{...labelStyle}}>{label || subLabel}</div>
				<div style={{...subLabelStyle}}>{label && subLabel}</div>
			</div>
			<ExpandButton rotated={isExpanded} />
		</div>
	)
}

const StyledTop = Radium(Top);

const ExpandableContainer = ({label, subLabel, hover, children, labelStyle, subLabelStyle}) => {
	const [expanded, setExpanded] = useState(false);

	const expandedStyle = {
		transition: 'height 0.5s ease-in-out',
		height: expanded ? '12rem' : '0rem',
		overflowY: 'auto'
	}

	return (
		<div style={style.container}>
			<StyledTop
				style={{...style.top(hover, expanded)}}
				expand={() => { setExpanded(!expanded)}}
				label={label}
				labelStyle={labelStyle}
				subLabelStyle={subLabelStyle}
				subLabel={subLabel}
				isExpanded={expanded}
			/>
			<div style={expandedStyle}>
				{ expanded && children }
			</div>
		</div>
	);
}

export default ExpandableContainer;
