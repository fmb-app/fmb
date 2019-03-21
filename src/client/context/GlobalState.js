import React, { useState, useReducer } from 'react';
import {geolocated} from 'react-geolocated';
import FmbContext from './FmbContext';
import { fmbReducer, ADD_DRINK, SET_DRINK, REMOVE_DRINK, SET_LOCATION, SET_RESULTS } from './Reducer';

const GlobalState = props => {
	const initialState = {
		location: '',
		drinks: [{name: '', key: 0}],
		results: [],
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

	const setLocation = event => {
		dispatch({type: SET_LOCATION, location: event.target.value});
	}

	const setResults = (results) => {
		dispatch({type: SET_RESULTS, results: results});
	}

	return (
		<FmbContext.Provider
			value={{
				drinks: state.drinks,
				location: state.location,
				addDrink: addDrink,
				setDrink: setDrink,
				removeDrink: removeDrink,
				setLocation: setLocation,
				setResults: setResults,
				results: state.results,
			}}
		>
			{props.children}
		</FmbContext.Provider>
	);
};

export default GlobalState;