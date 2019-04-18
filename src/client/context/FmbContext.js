import React, { createContext } from 'react';

const FmbContext = createContext({
	products: [],
	selectedProducts: [{}],
	selectedCategory: '',
	categories: [],
	location: {},
	results: [],
	setSelectedProducts: product => {},
	removeSelectedProduct: product => {},
	setSelectedCategory: category => {},
	setCoordinates: coordinates => {},
	setResults: results => [{}]
});

export default FmbContext;