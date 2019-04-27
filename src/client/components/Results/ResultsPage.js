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
  },
  header: {
    padding: '0 0 1rem 0'
  }
}

const OpeningHours = ({result}) => {
  const today = moment().format('YYYY-MM-DD');
  const openToday = result.openingHours[today].from;
  const closeToday = result.openingHours[today].to;

  const tomorrow = moment().add(1, 'd').format('YYYY-MM-DD');
  const openTomorrow = result.openingHours[tomorrow].from;
  const closeTomorrow = result.openingHours[tomorrow].to;

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap', fontSize: '0.6rem', alignItems: 'flex-end'}}>
      <span style={{fontWeight: '800', fontVariant: 'all-small-caps', fontSize: '1rem'}}>Öppettider</span>
      <span><span style={{fontWeight: '600'}}>Idag:</span> {closeToday == '00:00' ? 'Stängt' : openToday + ' - ' +  closeToday}</span>
      <span><span style={{fontWeight: '600'}}>Imorgon:</span> {closeTomorrow == '00:00' ? 'Stängt' : openTomorrow + ' - ' +  closeTomorrow}</span>
    </div>
  )
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

const Result = ({result}) => {
  return (
    <ExpandableContainer
      label={result.name || result.street}
      subLabel={result.name ? result.street : result.city}
      labelRight={<OpeningHours result={result} />}
      labelStyle={{fontSize: '1.4rem'}}
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