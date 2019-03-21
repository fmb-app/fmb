import React, {createContext} from 'react';

const SearchContext = createContext({
	categories: ['Vin', 'Öl', 'Sprit', 'Albin', 'Sara', 'Shappe', 'Patric'],
	drinks:['Höga kusten', 'kung', 'femkommatvåan', 'dragon blood', 'carlsberg'],
	selectedDrink: [],
});