import React, {useContext} from 'react'
import FmbContext from '../../context/FmbContext'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';



const Map = () => {
  const context = useContext(FmbContext);
  const setMapCoordinates = (e) => {
    console.log(e)
    const {lat,lng} = e.target._latlng
    console.log([lat,lng])
    context.setCoordinates([lat,lng])
  }
    return (
      <div>
      <center>
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
        </center>
      </div>
    );
}

export default Map
