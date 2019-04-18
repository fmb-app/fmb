import React, {useState, useEffect, useContext} from 'react';
import ExpandArrowIcon from '../Icons/ExpandArrowIcon';
import ExpandButton from '../Buttons/ExpandButton';
import { themes } from '../../themes/Themes';

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
	},
}

const ExpandableContainer = ({label, children, styleProps}) => {
	const [expanded, setExpanded] = useState(false);

	const handleClick = () => {
		setExpanded(!expanded);
	}

	const expandedStyle = () => {
		return {
			transition: 'height 0.5s ease-in-out',
			height: expanded ? '10rem' : '0rem',
			overflowY: 'auto',
		}
	}

	return (
		<div style={style.container}>
			<div 
				style={{...style.top, ...styleProps}}
				onClick={handleClick}
			>
				<h3>{label}</h3>
				<ExpandButton
					rotated={expanded}
				/>
			</div>
			<div style={expandedStyle()}>
				{ expanded && children }
			</div>
		</div>
	);
}

export default ExpandableContainer;