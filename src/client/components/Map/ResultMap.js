import React, {useContext} from 'react'
import FmbContext from '../../context/FmbContext'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { themes } from '../../themes/Themes';
import SystemetMarkerIcon from '../Icons/SystemetMarkerIcon';
import ResultLabel from '../Results/ResultLabel';

const style = {
  map: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100vw'
  },
  closeButton: {
    position: 'relative',
    top: '2rem',
    zIndex: '999'
  },
  gpsButton: {
    backgroundColor: '#E01A8A',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    height: '2rem',
    paddingLeft: themes.mediumSpace,
    paddingRight: themes.mediumSpace,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    top: '2.2rem',
    position: 'relative',
    zIndex: '998'
  }
}



const ResultMap = ({result}) => {
  const context = useContext(FmbContext);

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
      <div style={style.map}>
        <LeafletMap
          center={[context.location.lat, context.location.long]}
          zoom={14}
          maxZoom={20}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={false}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={[context.location.lat, context.location.long]} draggable={false}>
            <Popup>
              Detta är platsen som sökningen och eventuella resvägar kommer baseras på.
            </Popup>
          </Marker>
          {result.map((result) =>
            <Marker position={[result.location.coords.lat,result.location.coords.long]} icon={ SystemetMarkerIcon }>
              <Popup>
                <ResultLabel result={result} />
              </Popup>
            </Marker>
         )}
        </LeafletMap>
      </div>
    </div>
  );
}

export default ResultMap
