import React, { useState, useEffect, useReducer } from 'react';
import FmbContext from './FmbContext';
import { fmbReducer,
				 SET_PRODUCTS,
				 SET_SELECTED_PRODUCTS,
				 REMOVE_SELECTED_PRODUCT,
				 SET_LOCATION,
				 SET_RESULTS,
				 SET_CATEGORIES,
				 REMOVE_CATEGORY,
			 } from './Reducer';

const GlobalState = props => {
	const initialState = {
		categories: [],
		products: [],
		selectedProducts: [],
		location: {type: 'Address', data: ''},
		results: [],
	};

	const [state, dispatch] = useReducer(fmbReducer, initialState);

	const setProducts = products => {
		dispatch({type: SET_PRODUCTS, products: products});
	}

	const setSelectedProducts = product => {
		dispatch({type: SET_SELECTED_PRODUCTS, product: product});
	}

	const removeSelectedProduct = product => {
		dispatch({type: REMOVE_SELECTED_PRODUCT, product: product});
	}

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

	// This will run once when the app starts.
	useEffect(() => {
		// Get all product categories
    fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        return res.json();
      }).then((data) => {
      	// Remove the last element since it is null
      	const categories = data.filter((cat, index) => cat !== null);
      	dispatch({type: SET_CATEGORIES, categories: categories});
    }).catch((err) => {
    	console.log(err);
    });

		// Get all products
		fetch('/api/products', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			return res.json()
		}).then((res) => {
			dispatch({type: SET_PRODUCTS, products: res})
		});

		// Ask the user for location permissions
		navigator.geolocation.getCurrentPosition((position) => {
			if (position.coords) {
				context.setCoordinates(
					{
						lat: position.coords.latitude,
						long: position.coords.longitude 
					}
					);
			}
    });
	}, []);

	return (
		<FmbContext.Provider
			value={{
				products: state.products,
				setProducts: setProducts,
				selectedProducts: state.selectedProducts,
				setSelectedProducts: setSelectedProducts,
				removeSelectedProduct: removeSelectedProduct,
				categories: state.categories,
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