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