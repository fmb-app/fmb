import React from 'react';
import { Link } from 'react-router-dom';
import { themes } from '../../themes/Themes';

const style = {
  header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '6rem',
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
    paddingTop: '1rem'
  },
  slogan: {
    fontFamily: 'Playball',
    fontWeight: '200',
    color: themes.standardTextColor,
    marginBottom: '1rem'
  }
}

const Header = () => {
  return (
    <div style={style.header}>
      <Link to='/' style={{textDecoration: 'none'}}>
        <h1 style={style.headerFont}>Find my Bork</h1>
      </Link>
      <span style={style.slogan}>Hitta närmaste Systembolag som har din favoritbork!</span>
    </div>
  )
}

export default Header;