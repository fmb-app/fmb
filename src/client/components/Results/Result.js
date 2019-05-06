import React from 'react';
import ExpandableContainer from '../ExpandableContainer/ExpandableContainer';
import TravelRoute from '../TravelRoute/TravelRoute';
import ResultLabel from './ResultLabel';

const Result = ({result}) => {
  return (
    <ExpandableContainer
      label={<ResultLabel result={result} />}
      arrowPlacement='bottom'
    >
      <TravelRoute store={result} />
    </ExpandableContainer>
  );
}

export default Result;
