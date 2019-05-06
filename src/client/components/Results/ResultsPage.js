import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { themes } from '../../themes/Themes';
import FmbContext from '../../context/FmbContext';
import BottleSpinner from '../Loaders/BottleSpinner';
import Result from './Result.js';
import FMButton from '../Buttons/FMButton';
<<<<<<< HEAD
import ResultMap from '../Map/ResultMap';

=======
import Switch from '../Switches/Switch';
>>>>>>> 0dc81212a9428d234b1ab2649c78341865bd7351

const style = {
  container: {
    width: '22rem',
    maxHeight: '75%',
    marginTop: themes.mediumSpace,
    textAlign: 'left',
    padding: themes.mediumSpace,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: themes.standardRadius,
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column nowrap',

    color: 'white'
  },
  top: {
    display: 'flex',
    flexFlow:'column nowrap',
    alignItems: 'center'
  },
  header: {
    padding: '0 0 0.5rem 0'
  },
  toggle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '0.6rem',
    textTransform: 'uppercase'
  },
  listView: {
    maxHeight: '50vh',
    padding: '0.5rem',
    overflowY: 'auto'
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

const Results = ({results}) => {
  return (
    <div>
      {results.map((result, index) => <Result result={result} index={index+1} key={index+1} />)}
    </div>
  )
}

const Map = () => {
  return (
    <div>
      THIS IS A MAP
    </div>
  )
}

const ResultsPage = () => {
  const context = useContext(FmbContext);
  const [showMap, toggleMap] = useState(false);

  const isLoading = () => context.status.result.type === 'LOADING';

  return (
    <div 	style={style.container}>
      <div style={style.top}>
        <h2 style={style.header}>Närmaste Systembolag</h2>
      </div>
      {
        isLoading() ?
        <BottleSpinner /> :
        <div>
          {
            context.results.length < 1 ?
            <NoHits /> :
            <div>
              <div style={style.toggle}>
                Listvy
                <Switch isRight={showMap} onToggle={(toggle) => {toggleMap(toggle)}} />
                Kartvy
              </div>
              <div >
                {
                  showMap
                  ? <Map />
                  : <div style={style.listView}>
                      <Results results={context.results} />
                    </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default ResultsPage;
