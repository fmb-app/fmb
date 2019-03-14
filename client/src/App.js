import React, { useState, useEffect } from 'react';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';

const style = {
	header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '6rem',
    color: '#F8478C',
    fontSize: '2rem',
    fontFamily: 'Marck Script',
    wordSpacing: '3px',
    backgroundColor: 'rgba(0,0,0,0.8)',
	}
}

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div>
			<div style={style.header}>
				<h1>Find my Bork</h1>
			</div>
			<BottomNavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
		</div>
	);
}

export default App;