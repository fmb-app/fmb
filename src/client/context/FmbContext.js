import React, { createContext } from 'react';

const FmbContext = createContext({
	products: [],
	selectedProducts: [{}],
	categories: [],
	location: {},
	results: [],
	setSelectedProducts: product => {},
	removeSelectedProduct: product => {},
	setCoordinates: coordinates => {},
	setResults: results => [{}]
});

export default FmbContext;