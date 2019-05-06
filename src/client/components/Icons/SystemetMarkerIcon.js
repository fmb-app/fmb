import L from 'leaflet';
import systemetIcon from '../../resources/images/systemet-position.svg';

  const SystemetMarkerIcon = new L.Icon({
      iconUrl: systemetIcon,
      iconRetinaUrl: systemetIcon,
      iconAnchor: [20, 40],
      popupAnchor: [0, -35],
      iconSize: [40, 40],
  });

  export default SystemetMarkerIcon;
