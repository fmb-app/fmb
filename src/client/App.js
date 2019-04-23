import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalState from './context/GlobalState';
import Header from './components/Header/Header';
import MidSection from './components/MidSection/MidSection';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import Results from './components/Results/ResultsPage';

const style = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		height: '100vh',
	}
};

const App = () => {
	return (
		<GlobalState>
			<div style={style.container}>
				<Header />
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
