import React, {useState} from 'react';
import ExpandButton from '../Buttons/ExpandButton';
import { themes } from '../../themes/Themes';
import Radium from 'radium'

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		boxShadow: '0 0 5px 5px #000000',
		marginBottom: themes.standardSpace,
		borderRadius: themes.standardRadius,
		backgroundColor: '#262632',
	},
	top: (placement, hover, expanded) => {
		return {
			display: 'flex',
			flexDirection: placement,
			justifyContent: 'space-between',
			padding: themes.standardSpace,
			backgroundColor: (hover || !expanded) && '#363642',
			cursor: 'pointer',
		}
	},
	expanded: (expanded) => {
		return {
			transition: 'height 0.5s ease-in-out',
			height: expanded ? '12rem' : '0rem',
			overflowY: 'auto'
		}
	}
};

const ExpandableContainer = ({label, arrowPlacement = 'right', children}) => {
	const [expanded, setExpanded] = useState(false);

	const placement = () => {
		switch (arrowPlacement) {
			case 'left':
				return 'row-reverse';
			case 'top':
				return 'column-reverse';
			case 'right':
				return 'row';
			case 'bottom':
				return 'column';
			default:
				return 'row';
		}
	}

	return (
		<div style={style.container}>
			<div 
				style={style.top(placement())} 
				onClick={() => {setExpanded(!expanded)}}
			>
				{ label }
				<ExpandButton rotated={expanded} />
			</div>
			<div style={style.expanded(expanded)}>
				{ expanded && children }
			</div>
		</div>
	);
};

export default ExpandableContainer;
