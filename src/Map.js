import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center1 = { lat: 48.86322794493173, lng: 2.2814537353515663 };
const center2 = { lat: 48.865430010766666, lng: 2.2814537353515663 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ""
  });

  const [dirOptions, setDirOptions] = useState({
    origin: "Chicago, IL",
    destination: "Los Angeles, CA",
    provideRouteAlternatives: false,
    travelMode: "DRIVING"
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef();
  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const destiantionRef = useRef();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const originPin = (e) => {
    console.log("origin:");
    console.log(e.latLng.toJSON());
  };

  const destinationPin = (e) => {
    console.log("destination:");
    console.log(e.latLng.toJSON());
  };

  const dirResult = (dirResult) => {
    console.log(dirResult);
  };

  return (
    <GoogleMap
      center={center1}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={center1} draggable={true} onDragEnd={originPin} />
      <Marker position={center2} draggable={true} onDragEnd={destinationPin} />
      {dirResult && (
        <DirectionsService options={dirOptions} callback={dirResult} />
      )}
      {/* {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            draggable: true,
            polylineOptions: {
              strokeOpacity: 12,
              strokeColor: "#1641a6",
              strokeWeight: 12
            }
          }}
        />
      )} */}
    </GoogleMap>
  );
}

export default App;
