import React, {useContext} from 'react'
import FmbContext from '../../context/FmbContext'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import CloseButton from '../Buttons/CloseButton';
import GPSIcon from '../Icons/GPSIcon';
import { themes } from '../../themes/Themes';
import Radium from 'radium';

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
    zIndex: '998',
    ':hover': {
      backgroundColor: '#F02A9A'
    }
  }
}

const GPSButton = ({getCoordinates}) => {
  return <div style={style.gpsButton} onClick={getCoordinates}>
    Använd min position
    <div style={{marginLeft: '0.4rem'}}>
      <GPSIcon width='16px' height='16px' />
    </div>
  </div>
}

const HoverGPSButton = Radium(GPSButton);

const Map = ({toggleMap}) => {
  const context = useContext(FmbContext);

  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      context.setCoordinates({lat: position.coords.latitude, long: position.coords.longitude});
    });
  }

  const setMapCoordinates = (e) => {
    const {lat, lng} = e.target._latlng
    context.setCoordinates({lat: lat, long: lng})
  }
  const onMapClickEventHandler = (e) => {
    const {lat, lng} = e.latlng
    context.setCoordinates({lat: lat, long: lng})
  }

  return (
    <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '24px'}}></div>
        <HoverGPSButton getCoordinates={getCoordinates} />
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <CloseButton
            style={style.closeButton}
            onClick={toggleMap}
          />
        </div>
      </div>
      <div style={style.map}>
        <LeafletMap
          center={[59.3498, 18.0707]}
          zoom={10}
          maxZoom={20}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={false}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          onClick={onMapClickEventHandler}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={[context.location.lat, context.location.long]} draggable={true} onDragEnd={setMapCoordinates}>
            <Popup>
              Detta är platsen som sökningen och eventuella resvägar kommer baseras på.
            </Popup>
          </Marker>
        </LeafletMap>
      </div>
    </div>
  );
}

export default Map
