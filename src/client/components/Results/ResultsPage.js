import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { themes } from '../../themes/Themes';
import FmbContext from '../../context/FmbContext';
import Result from './Result.js';
import FMButton from '../Buttons/FMButton';
import BottleSpinner from '../Loaders/BottleSpinner';

const style = {
  container: {
    width: '22rem',
    height: '75%',
    marginTop: themes.mediumSpace,
    textAlign: 'left',
    padding: themes.mediumSpace,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: themes.standardRadius,
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column nowrap',
    overflowY: 'auto',
    color: 'white'
  },
  top: {
    display: 'flex',
    flexFlow:'column nowrap',
    alignItems: 'center'
  },
  header: {
    padding: '0 0 1rem 0'
  },
  results: {
    height: '100%',
    overflowY: 'auto',
    padding: '0.5rem',
  }
}

const NoHits = () => {
  return <div>
    Inga systembolag matchade din sökning :(
    <Link to='/' style={{ textDecoration: 'none', width: '100%', padding: '2rem 0'}}>
      <FMButton
        label='Tillbaka till sök'
        color={themes.standardTextColor}
        bgcolor={themes.primaryButton}
      />
    </Link>
  </div>
}

const Results = () => {
  const context = useContext(FmbContext);

  const isLoading = () => context.status.result.type === 'LOADING';

  return (
    <div 	style={style.container}>
      <div style={style.top}>
        <h2 style={style.header}>Närmaste Systembolag</h2>
      </div>
      { 
        isLoading() ?
        <BottleSpinner /> :
        <div style={style.results}>
          {
            context.results.length < 1 ?
            <NoHits /> :
            context.results.map((result, index) => <Result result={result} index={index+1} key={index+1} />)
          }
        </div>
      }
    </div>
  );
}

export default Results;