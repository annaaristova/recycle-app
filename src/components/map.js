import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import "../css-files/map.css";

export default function Map({address, locationMarker, setLocation}) {

    var markers = [];

    const closestLocation = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        size: new window.google.maps.Size(38, 38), 
        scaledSize: new window.google.maps.Size(38, 38), 
    };

    const myLocation = {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        size: new window.google.maps.Size(38, 38), 
        scaledSize: new window.google.maps.Size(38, 38), 
    };
    
    const position = { lat: 37.33809988023966, lng: -121.89857536983719 };
    const ref = useRef();

    const {state} = useLocation();

    useEffect(()=>{
        if (state){
            markers.push({ lat: state.latitude, lng: state.longitude, color: myLocation });
            state.locationMarker.forEach(marker => {
                markers.push({ lat: marker.lat, lng: marker.lng, color: closestLocation})
            });
        }
    });

    useEffect(() => {
        if (address){
            markers.push({ lat: address.lat, lng: address.lng, color: myLocation });
        }
    });

    useEffect(() => {
        if (locationMarker){
            locationMarker.forEach(marker => {
                markers.push({ lat: marker.lat, lng: marker.lng, color: closestLocation })
            });
        }
    });

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
          center: position,
          zoom: 11,
        });

        markers.map((location) => {
            new window.google.maps.Marker({
                position:{ lat: location.lat, lng: location.lng }, 
                map,
                icon: location.color
            })
        });
    });

    return (
        <div ref={ref} id="map"/>
    );
};





/*
var address;
    var locationCoordinates = [];



    const [marker, setMarker] = useState([]);

    

    
        geocode(RequestType.ADDRESS, address)
        .then(({ results }) => {
            var { lat, lng } = results[0].geometry.location;
            axios.post('http://localhost:3001/find_location', {addr: address, geocode: { lat, lng }})
            .then(function (response) {
                for (var i=0; i<response.data.length; i++){
                    locationCoordinates.push({"addr": response.data[i].addr, "dist": response.data[i].distance});
                    marker.push({ lat: response.data[i].lat, lng: response.data[i].lng });
                    //setMarker({ lat: response.data[i].lat, lng: response.data[i].lng });
                }
                setLocation(locationCoordinates);
                
            })
            .catch(function (error) {
                console.log(error);
            })
            marker.push({lat, lng });
        })
    }

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
                    {marker && marker.map((location, index) => 
                        <MarkerF 
                            key={index}
                            position={{ lat: location.lat, lng: location.lng }} 
                        />
                    )}
                </GoogleMap> 
            )}
        </div>
    );
    */