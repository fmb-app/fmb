import React, { useState, useReducer } from 'react';
import {geolocated} from 'react-geolocated';
import FmbContext from './FmbContext';
import { fmbReducer, SET_LOCATION, SET_RESULTS, REMOVE_CATEGORY, SET_SELECTED_DRINKS } from './Reducer';

const GlobalState = props => {
	const initialState = {
		categories: ['Vin', 'Öl', 'Cider', 'Bubbel', 'Korv'],
		selectedDrinks: [],
		location: {type: 'Address', data: ''},
		results: [],
	};

	const [state, dispatch] = useReducer(fmbReducer, initialState);

	const setLocation = event => {
		dispatch({type: SET_LOCATION, location: {type: 'Address', data: event.target.value}});
	}

	const setCoordinates = (coordinates) => {
		dispatch({type: SET_LOCATION, location: {type: 'GPS', data: coordinates}});
	}

	const removeCategory = (category) => {
		dispatch({type: REMOVE_CATEGORY, category: category});
	}

	const setResults = (results) => {
		dispatch({type: SET_RESULTS, results: results});
	}

	const setSelectedDrinks = (drink) => {
		console.log('FECK2 ' + drink);
		dispatch({type: SET_SELECTED_DRINKS, drink: drink});
	}

	return (
		<FmbContext.Provider
			value={{
				categories: state.categories,
				selectedDrinks: state.selectedDrinks,
				setSelectedDrinks: setSelectedDrinks,
				removeCategory: removeCategory,
				location: state.location,
				setLocation: setLocation,
				setCoordinates: setCoordinates,
				setResults: setResults,
				results: state.results,
			}}
		>
			{props.children}
		</FmbContext.Provider>
	);
};

export default GlobalState;