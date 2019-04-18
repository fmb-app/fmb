import React, { useContext } from 'react';
import moment from 'moment';
import FmbContext from '../../context/FmbContext';
import ExpandableContainer from '../ExpandableContainer/ExpandableContainer';
import TravelRoute from '../TravelRoute/TravelRoute';
import { themes } from '../../themes/Themes';


const bolagetName = (result) => result.name ? result.name + ' - ' + result.street : result.street;

const openingHours = (result) => {
  const today = moment().format('YYYY-MM-DD');
  const open = result.openingHours[today].from;
  const close = result.openingHours[today].to
  return `Öppettider: ${close == '00:00' ? 'Stängt för dagen': open + ' - ' +  close}`;
}

const Result = ({result}) => {
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
      width: '32rem',
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
      <div style={{display: 'flex', flexFlow:'column nowrap', alignItems: 'center'}}>
        <h2>Närmaste Systembolag:</h2>
        { context.results.length > 0
          ? <div>{context.results.length} Systembolag har produkte{context.selectedProducts.length > 1 ? 'rna' : 'n'}:</div>
          : <div>Inga systembolag matchade din sökning :(</div>
        }
      </div>
      { context.results &&
        context.results.map((result, index) => 
        <Result result={result} index={index+1} key={index+1} />
      )}
    </div>
  );
}

export default Results;