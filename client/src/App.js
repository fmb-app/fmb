import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/styles';
import MidSection from './components/MidSection'
import BottomNavBar from './components/BottomNavBar';

const useStyles = makeStyles({
	midWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		widht: '100%',
		marginTop: '1rem',
	},
	header: {
		color: '#EFEFEF !important'
	}
});

const App = () => {
	const classes = useStyles();
	return (
		<div>
			<Typography className={classes.header} variant='h1' align='center' color='white'>
				Find My Bork
			</Typography>
			<div className={classes.midWrapper}>
				<MidSection />
			</div>
			<BottomNavBar />
		</div>
	);
}

export default App;