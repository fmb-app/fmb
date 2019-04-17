import React, {useContext} from 'react'
import FmbContext from '../../context/FmbContext'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const style = {
  map: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const Map = () => {
  const context = useContext(FmbContext);

  const setMapCoordinates = (e) => {
    console.log(e)
    const {lat,lng} = e.target._latlng
    console.log([lat,lng])
    context.setCoordinates([lat,lng])
  }
    return (
      <div style={style.map}>
        <LeafletMap
          center={[59.3498, 18.0707]}
          zoom={10}
          maxZoom={20}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={context.location.data} draggable={true} onDragEnd={setMapCoordinates}>
            <Popup>
              Popup for any custom information.
            </Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
}

export default Map