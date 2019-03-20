import React, { createContext } from 'react';

const FmbContext = createContext({
	location: '',
	drinks: [],
	addDrink: drink => {},
	setDrink: drink => {},
	removeDrink: drink => {},
});

export default FmbContext;