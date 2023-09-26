import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "../css-files/map.css";
import { useState } from 'react';


export default function Map(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q",
    });
    
    const center = useMemo(() => ({ lat: 37.33809988023966, lng: -121.89857536983719 }), []);
    const [marker, setMarker] = useState(null);

    /*const onMapClick = useCallback((event) => {
        setMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        });
    }, []);*/

    return (
        <div className="map">
        {!isLoaded ? (
            <h1>Loading...</h1>
        ) : (
            <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}

            >
                
            </GoogleMap> 
        )}
        </div>
    );
};

/* lat: 37.33809988023966,
      lng: -121.89857536983719 
      googleMapsApiKey: "AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q",
      */






