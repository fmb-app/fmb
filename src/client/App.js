import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import GlobalState from './context/GlobalState';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import MidSection from './components/MidSection/MidSection';
import Results from './components/Results/ResultsPage';
import { themes } from './themes/Themes';

const style = {
	header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '5rem',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		top: '0',
	},
	headerFont: {
		color: themes.secondaryGradient,
		fontSize: '3rem',
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
	},
};

const App = () => {
	return (
		<GlobalState>
			<div style={style.container}>
				<div style={style.header}>
					<Link to='/' style={{textDecoration: 'none'}}>
						<h1 style={style.headerFont}>Find my Bork</h1>
					</Link>
				</div>
				<Switch>
					<Route exact path={'/results'} component={Results} />
					<Route component={MidSection} />
				</Switch>
				<BottomNavBar />
			</div>
		</GlobalState>
	);
};

export default App;
