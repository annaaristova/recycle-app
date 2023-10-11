import searchSign from "../images/searchSign.png"
import "../css-files/searchBar.css";
import {usePlacesWidget} from "react-google-autocomplete";
import {setKey, geocode, RequestType} from "react-geocode";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "../css-files/map.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";


export default function SearchBarAddress() {
    var address;

    const {ref} = usePlacesWidget({
        apiKey:"AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q",
        onPlaceSelected: (place) => {
            console.log(place);
            },
            options: {
                types:['regions'], 
                types: ['geocode'],
                componentRestrictions: { country: "us" },
        },
    });

    setKey("AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q");

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q",
    });

    const center = useMemo(() => ({ lat: 37.33809988023966, lng: -121.89857536983719 }), []);

    const {state} = useLocation();
    const [marker, setMarker] = useState(null);

    useEffect(()=>{
        if (state){
            setMarker({ lat: state.latitude, lng: state.longitude });
        }
    }, [state]);
    
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        address = formData.get('address');
    
        geocode(RequestType.ADDRESS, address)
        .then(({ results }) => {
            var { lat, lng } = results[0].geometry.location;
            axios.post('http://localhost:3001/find_location', {addr: address, geocode: { lat, lng }}).then((response) => {
            console.log(response);
            });
            setMarker({ lat, lng });
        })
    }

    return(
        <>
            <div className="searchBarWrapper">
                <form onSubmit={handleSubmit} className="searchBarForm">
                    <input ref={ref} className="searchBar" name="address" type="text" placeholder="Enter Address or Zip"/>
                    <button className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
                </form>
            </div>
            <div className="map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
                >
                   {marker && <MarkerF position={marker} />}
                </GoogleMap> 
            )}
            </div>
        </>
    );
}





