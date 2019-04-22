import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import FmbContext from '../../context/FmbContext';
import ExpandableContainer from '../ExpandableContainer/ExpandableContainer';
import TravelRoute from '../TravelRoute/TravelRoute';
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
  }
}

const bolagetName = (result) => result.name ? result.name + ' - ' + result.street : result.street;

const openingHours = (result) => {
  const today = moment().format('YYYY-MM-DD');
  const open = result.openingHours[today].from;
  const close = result.openingHours[today].to
  return `Öppettider: ${close == '00:00' ? 'Stängt för dagen': open + ' - ' +  close}`;
}

const NoHits = () => {
  return <div>Inga systembolag matchade din sökning :(
    <Link to='/' style={{ textDecoration: 'none', width: '100%' }}>
      <FMButton
        label='Tillbaka till sök'
        color={themes.standardTextColor}
        bgcolor={themes.primaryButton}
      />
    </Link>
  </div>
}

const Result = ({result}) => {
  return (
    <ExpandableContainer
      label={result.name}
      subLabel={result.street}
      labelStyle={{fontSize: '1.5rem'}}
      subLabelStyle={{fontVariant: 'all-small-caps'}}
    >
      <TravelRoute store={result} />
    </ExpandableContainer>
  );
}

const Results = () => {
  const context = useContext(FmbContext);

  return (
    <div 	style={style.container}>
      <div style={style.top}>
        <h2>Närmaste Systembolag:</h2>
        { context.results.length > 0
          ? <div>{context.results.length} Systembolag har produkte{context.selectedProducts.length > 1 ? 'rna' : 'n'}:</div>
          : <NoHits />
        }
      </div>
      { context.results &&
        context.results.map((result, index) => <Result result={result} index={index+1} key={index+1} />)
      }
    </div>
  );
}

export default Results;