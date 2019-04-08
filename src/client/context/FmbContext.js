import React, { createContext } from 'react';

const FmbContext = createContext({
	products: [],
	categories: [],
	selectedDrinks: [{}],
	location: {},
	results: [],
	setSelectedDrinks: drink => {},
	setLocation: location => {},
	setResults: results => {}
});

export default FmbContext;