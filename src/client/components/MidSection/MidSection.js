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

	const initialState = [{text: '', key: 0}];
	const [inputFields, setInputFields] = useState(initialState);

	const removeField = (key) => {
		setInputFields(
			inputFields.filter(
				(elem) => elem.key !== key
			)
		);
	}

	const setInput = (affectedKey, e) => {
		const newText = e.target.value;
		setInputFields(
			inputFields.map((elem, key) => affectedKey === key ? ({text: newText, key: key}) : elem)
		);
	}

	return (
		<div style={style.midSection}>
		<h2 style={style.heading2}>Dryck:</h2>
		{ context.drinks.map((item) => (
			<div key={item.key} style={{width: '100%'}}>
				<div style={style.row}>
					<RegularInputField
		          placeholder='Dryck'
		          onChange={context.setDrink.bind(this, item.key)}
		      />
		      <RegularButton
		      	label='X'
		      	bgcolor={themes.secondaryButton}
		      	color={themes.standardTextColor}
		      	onClick={context.removeDrink.bind(this, item.key)}
		      	disabled={context.drinks.length === 1}
		      />
		    </div>
    		<HorizontalDivider />
    	</div>
		))}
			<RegularButton 
				label='+' 
				bgcolor={themes.primaryButton}
				color={themes.standardTextColor}
				onClick={context.addDrink}
			/>
			<pre style={{color: 'white'}}>{JSON.stringify(context.drinks,0,2)}</pre>
		</div>
	);
}

export default MidSection;