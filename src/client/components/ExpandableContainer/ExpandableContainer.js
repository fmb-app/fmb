import React, {useState, useEffect, useContext} from 'react';
import ExpandArrowIcon from '../Icons/ExpandArrowIcon';
import ExpandButton from '../Buttons/ExpandButton';
import { themes } from '../../themes/Themes';

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'black',
		marginTop: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
	},
	top: {
		width: '100%',
		padding: themes.standardSpace,
		display: 'flex',
		backgroundColor: 'rgba(0,0,0, 0.5)',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
}

const ExpandableContainer = ({label, children}) => {
	const [expanded, setExpanded] = useState(false);

	const handleClick = () => {
		setExpanded(!expanded);
	}

	const expandedStyle = () => {
		return {
			transition: 'height 0.5s ease-in-out',
			height: expanded ? '6rem' : '0rem',
			overflowY: 'auto',
		}
	}

	return (
		<div style={style.container}>
			<div style={style.top}>
				<h3>{label}</h3>
				<ExpandButton
					rotated={expanded}
					onClick={handleClick}
				/>
			</div>
			<div style={expandedStyle()}>
				{ expanded && children }
			</div>
		</div>
	);
}

export default ExpandableContainer;