import React, { useState, useReducer } from 'react';
import FmbContext from './FmbContext';
import { fmbReducer, ADD_DRINK, SET_DRINK, REMOVE_DRINK } from './Reducer';

const GlobalState = props => {
	const initialState = {
		location: '',
		drinks: [{name: '', key: 0}],
	};

	const [state, dispatch] = useReducer(fmbReducer, initialState);

	const addDrink = () => {
		dispatch({type: ADD_DRINK});
	}

	const removeDrink = key => {
		dispatch({type: REMOVE_DRINK, key: key});
	}

	const setDrink = (key, event) => {
		dispatch({type: SET_DRINK, drink: event.target.value, key: key});
	}

	return (
		<FmbContext.Provider
			value={{
				drinks: state.drinks,
				addDrink: addDrink,
				setDrink: setDrink,
				removeDrink: removeDrink
			}}
		>
			{props.children}
		</FmbContext.Provider>
	);
};

export default GlobalState;