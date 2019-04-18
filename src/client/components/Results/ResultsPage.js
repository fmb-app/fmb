import React, { useContext } from 'react';
import moment from 'moment';
import FmbContext from '../../context/FmbContext';
import ExpandableContainer from '../ExpandableContainer/ExpandableContainer';
import TravelRoute from '../TravelRoute/TravelRoute';
import { themes } from '../../themes/Themes';


const bolagetName = result => {
  if (result.name) {
    return result.name + ' - ' + result.street;
  } else {
    return result.street;
  }
}

const openingHours = result => {
  const today = moment().format('YYYY-MM-DD');
  const open = result.openingHours[today].from;
  const close = result.openingHours[today].to
  if (close == '00:00') {
    return 'Öppettider: Stängt för dagen';
  } else {
    return 'Öppettider: ' + open + ' - ' +  close;
  }

}

const Result = ({result, index}) => {
  return (
    <ExpandableContainer
    label={bolagetName(result)}
    >
      <TravelRoute store={result} />
    </ExpandableContainer>
  );
}

const Results = () => {
  // const dest = {lat: 59.312870597238124, long: 18.061523437500004};  
  // getTravelRoute(dest);
  const context = useContext(FmbContext);

  return (
    <div 	style={{
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
    }}>
      <h1 style={{textAlign: 'center'}}>Närmaste Systembolag:</h1>
      Found: {context.results.length}
      { context.results.map((result, index) => <Result result={result} index={index+1} key={index+1} />) }
    </div>
  );
}

export default Results;