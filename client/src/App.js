import React, { useState } from 'react';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import MidSection from './components/MidSection/MidSection';
import { themes } from './themes/Themes'

const style = {
	header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '6rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'fixed',
    top: '0',
	},
	headerFont: {
		color: themes.secondaryGradient,
    fontSize: '4rem',
    fontFamily: 'Marck Script',
    wordSpacing: '-1rem',
    background: 'linear-gradient(60deg, #e01a8a 39%,#ce8114 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitUserSelect: 'none',
  	MozUserSelect: 'none',
  	msUserSelect: 'none',
  	userSelect: 'none',
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100vh',
	}
}

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div style={style.container}>
			<div style={style.header}>
				<h1 style={style.headerFont}>Find my Bork</h1>
			</div>
			<MidSection />
			<BottomNavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
		</div>
	);
}

export default App;