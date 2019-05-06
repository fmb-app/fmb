import React, { createContext } from 'react';

const FmbContext = createContext({
	products: [],
	selectedProducts: [{}],
	selectedCategory: '',
	categories: [],
	location: {},
	results: [],
	filterTerm: '',
	sorting: '',
	searchOffset: 0,
	status: {
		product: {},
		category: {},
		result: {},
	},
	setProductStatus: status => {},
	setCategoryStatus: status => {},
	setResultStatus: status => {},
	setTravelStatus: status => {},
	setSearchOffset: offset => {},
	setSorting: sorting => {},
	setFilterTerm: term => {},
	setSelectedProducts: product => {},
	removeSelectedProduct: product => {},
	resetSelectedProducts: () => {},
	setSelectedCategory: category => {},
	setCoordinates: coordinates => {},
	setResults: results => [{}]
});

export default FmbContext;