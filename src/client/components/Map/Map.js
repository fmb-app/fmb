import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const style = {
  leafletContainer: {
    height: "400px",
    width: "800px"
  }
}

const Map = () => {
    return (
      <div style={{marginTop:'7rem'}}>
        <LeafletMap
          center={[59, 18]}
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
          <Marker position={[59, 18]} draggable={true}>
            <Popup>
              Popup for any custom information.
            </Popup>
          </Marker>
        </LeafletMap>
      </div>
    );
}

export default Map