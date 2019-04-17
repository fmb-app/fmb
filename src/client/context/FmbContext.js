import React, { createContext } from 'react';

const FmbContext = createContext({
	products: [],
	selectedProducts: [{}],
	categories: [],
	location: {},
	results: [],
	setSelectedProducts: product => {},
	removeSelectedProduct: product => {},
	setLocation: location => {},
	setResults: results => [{}]
});

export default FmbContext;