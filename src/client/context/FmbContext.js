import React, { createContext } from 'react';

const FmbContext = createContext({
	categories: [{}],
	selectedDrinks: [{}],
	location: {},
	results: [],
	setSelectedDrinks: drink => {},
	setLocation: location => {},
	setResults: results => {}
});

export default FmbContext;