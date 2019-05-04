import React, { useEffect, useReducer } from 'react';
import FmbContext from './FmbContext';
import { fmbReducer,
				 SET_PRODUCTS,
				 SET_SELECTED_PRODUCTS,
				 REMOVE_SELECTED_PRODUCT,
				 RESET_SELECTED_PRODUCTS,
				 SET_LOCATION,
				 SET_RESULTS,
				 SET_CATEGORIES,
				 SET_SELECTED_CATEGORY,
				 SET_SEARCH_OFFSET,
				 SET_SORTING,
				 SET_FILTER_TERM,
				 FETCH_PRODUCTS,
				 SET_PRODUCT_STATUS,
				 SET_CATEGORY_STATUS,
				 SET_RESULT_STATUS,
			 } from './Reducer';

const GlobalState = props => {
	const initialState = {
		categories: [],
		products: [],
		selectedProducts: [],
		selectedCategory: '',
		searchOffset: 0,
		filterTerm: '',
		sorting: 'POPULARITY_DESC',
		location: {
			lat: '59.34810925465446',
			long: '18.071363536039396',
			address: ''
		},
		results: [],
		status: {
			product: {type: 'LOADING', messsage: ''},
			category: {type: 'LOADING', messsage: ''},
			result: {type: 'LOADING', messsage: ''},
		}
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

	const resetSelectedProducts = () => {
		dispatch({type: RESET_SELECTED_PRODUCTS});
	}

	const setCoordinates = (coordinates) => {
		dispatch({type: SET_LOCATION, location: {lat: coordinates.lat, long: coordinates.long}});
	}

	const setSelectedCategory = (category) => {
		dispatch({type: SET_SELECTED_CATEGORY, category: category});
	}

	const setResults = (results) => {
		dispatch({type: SET_RESULTS, results: results});
	}

	const setSearchOffset = (offset) => {
		dispatch({type: SET_SEARCH_OFFSET, offset: offset});
	}

	const setSorting = (sorting) => {
		dispatch({type: SET_SORTING, sorting: sorting});
	}

	const setFilterTerm = (term) => {
		dispatch({type: SET_FILTER_TERM, term: term});
	}

	const fetchProducts = (offset) => {
		dispatch({type: FETCH_PRODUCTS, offset: offset});
	}

	const setProductStatus = (status) => {
		dispatch({type: SET_PRODUCT_STATUS, status: status});
	}

	const setCategoryStatus = (status) => {
		dispatch({type: SET_CATEGORY_STATUS, status: status});
	}

	const setResultStatus = (status) => {
		dispatch({type: SET_RESULT_STATUS, status: status});
	}

	/*
	 * Fetch all categories
	 */
	useEffect(() => {
		setCategoryStatus({type: 'LOADING', message: 'Loading categories'});
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
      	setCategoryStatus({type: 'LOADED', message: 'Categories has successfully been fetched'});
    }).catch((err) => {
    	setCategoryStatus({type: 'ERROR', message: 'Categories could not be fetched'});
    	console.log(err);
    });

		// Ask the user for location permissions
		navigator.geolocation.getCurrentPosition((position) => {
			if (position.coords) {
				setCoordinates(
					{
						lat: position.coords.latitude,
						long: position.coords.longitude 
					}
				);
			}
    });
	}, []);

	useEffect(() => {
		setProductStatus({type: 'LOADING', message: 'Loading products'});
		const cat    = state.selectedCategory     === '' ? 'null' : state.selectedCategory;
		const term   = state.filterTerm   				=== '' ? 'null' : state.filterTerm;

		// Get all products
		fetch(`/api/products/${cat}/${term}/${state.searchOffset}/${state.sorting}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			return res.json()
		}).then((products) => {
			if (state.searchOffset === 0) {
				dispatch({type: SET_PRODUCTS, products: products});
			} else {
				const updateProducts = [...state.products, ...products];
				dispatch({type: SET_PRODUCTS, products: updateProducts});
			}
			setProductStatus({type: 'LOADED', message: 'Products has been successfully been fetched'});
		});
	}, [
			 state.selectedCategory,
			 state.filterTerm,
			 state.sorting,
			 state.searchOffset,
		 ]
	)

	return (
		<FmbContext.Provider
			value={{
				products: state.products,
				setProducts: setProducts,
				selectedProducts: state.selectedProducts,
				setSelectedProducts: setSelectedProducts,
				removeSelectedProduct: removeSelectedProduct,
				resetSelectedProducts: resetSelectedProducts,
				categories: state.categories,
				filterTerm: state.filterTerm,
				sorting: state.sorting,
				searchOffset: state.searchOffset,
				setSearchOffset: setSearchOffset,
				setSorting: setSorting,
				setFilterTerm: setFilterTerm,
				selectedCategory: state.selectedCategory,
				setSelectedCategory: setSelectedCategory,
				location: state.location,
				setCoordinates: setCoordinates,
				setResults: setResults,
				results: state.results,
				status: state.status,
				setProductStatus: setProductStatus,
				setCategoryStatus: setCategoryStatus,
				setResultStatus: setResultStatus,
			}}
		>
			{props.children}
		</FmbContext.Provider>
	);
};

export default GlobalState;