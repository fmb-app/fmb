import React, { useState, useEffect, useReducer } from 'react';
import {geolocated} from 'react-geolocated';
import FmbContext from './FmbContext';
import { fmbReducer,
				 SET_LOCATION,
				 SET_RESULTS,
				 REMOVE_CATEGORY,
				 SET_SELECTED_DRINKS,
				 SET_CATEGORIES 
			 } from './Reducer';

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
		dispatch({type: SET_SELECTED_DRINKS, drink: drink});
	}

	useEffect(() => {
    fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        return res.json();
      }).then((data) => {
      	// Remove the last element since it is null
      	const categories = data.slice(0, data.length - 2);
      	dispatch({type: SET_CATEGORIES, categories: categories});
    }).catch((err) => {
    	console.log(err);
    });
	}, []);

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