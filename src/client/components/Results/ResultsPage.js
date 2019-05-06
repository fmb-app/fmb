import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import FmbContext from '../../context/FmbContext';
import Result from './Result.js';
import { themes } from '../../themes/Themes';
import FMButton from '../Buttons/FMButton';

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

  return (
    <div 	style={style.container}>
      <div style={style.top}>
        <h2 style={style.header}>Närmaste Systembolag</h2>
        { (context.results.length > 0  && context.selectedProducts.length > 0)
          ? <div>{context.results.length} Systembolag har produkte{context.selectedProducts.length > 1 ? 'rna' : 'n'}:</div>
          : (context.results.length === 0 ? <NoHits /> : null)
        }
      </div>
      <div style={{height: '100%', overflowY: 'auto', padding: '0 0.5rem'}}>
        { context.results &&
          context.results.map((result, index) => <Result result={result} index={index+1} key={index+1} />)
        }
      </div>
    </div>
  );
}

export default Results;