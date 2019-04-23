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
	top: (hover, expanded, labelRight) => { 
		return {
			width: '100%',
			padding: themes.standardSpace,
			display: 'flex',
			flexDirection: labelRight ? 'column' : 'row',
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

const Top = ({style, label, subLabel, labelRight, expand, isExpanded, labelStyle, subLabelStyle}) => {
	return (
		<div style={style} onClick={expand}>
			<div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', width: '100%'}}>
				<div style={{display: 'flex', flexFlow: 'column nowrap'}}>
					<div style={{...labelStyle}}>{label || subLabel}</div>
					<div style={{...subLabelStyle}}>{label && subLabel}</div>
				</div>
				<div>
					{labelRight}
				</div>
			</div>
				<ExpandButton rotated={isExpanded} />
		</div>
	)
}

const StyledTop = Radium(Top);

const ExpandableContainer = ({label, subLabel, labelRight, hover, children, labelStyle, subLabelStyle}) => {
	const [expanded, setExpanded] = useState(false);

	const expandedStyle = {
		transition: 'height 0.5s ease-in-out',
		height: expanded ? '12rem' : '0rem',
		overflowY: 'auto'
	}

	return (
		<div style={style.container}>
			<StyledTop
				style={{...style.top(hover, expanded, labelRight)}}
				expand={() => { setExpanded(!expanded)}}
				label={label}
				labelStyle={labelStyle}
				subLabelStyle={subLabelStyle}
				subLabel={subLabel}
				labelRight={labelRight}
				isExpanded={expanded}
			/>
			<div style={expandedStyle}>
				{ expanded && children }
			</div>
		</div>
	);
}

export default ExpandableContainer;
