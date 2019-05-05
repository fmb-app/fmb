import React, {useContext} from 'react'
import FmbContext from '../../context/FmbContext'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import CloseButton from '../Buttons/CloseButton';

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
  }
}

const Map = ({toggleMap}) => {
  const context = useContext(FmbContext);

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
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <CloseButton
          style={style.closeButton}
          onClick={toggleMap}
        />
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
