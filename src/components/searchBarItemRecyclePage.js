import searchSign from "../images/searchSign.png"
import "../css-files/searchBar.css";
import {usePlacesWidget} from "react-google-autocomplete";
import {setKey, geocode, RequestType} from "react-geocode";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";


export default function SearchBarItem() {

    const {ref, autocompleteRef} = usePlacesWidget({
        apiKey:"AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q",
        onPlaceSelected: (place) => {
            console.log(place);
            },
            options: {
                types:['regions'],
                types:['geocode'],
                componentRestrictions: { country: "us" },
        },
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q",
    });

    const center = useMemo(() => ({ lat: 37.33809988023966, lng: -121.89857536983719 }), []);


    return(
        <>
            <div className="searchBarWrapper">
                <form>
                    <input ref={ref} className="searchBar" type="text" placeholder="Search an Item"/>
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
                </GoogleMap> 
            )}
            </div>
        </>
    );
}