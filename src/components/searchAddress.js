import searchSign from "../images/searchSign.png"
import "../css-files/searchBar.css";
import {usePlacesWidget} from "react-google-autocomplete";
import {setKey, geocode, RequestType} from "react-geocode";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";


export default function SearchBarAddress({setAddress, setLocation, setLocationMarker}) {
    var locationCoordinates = [];
    var locationMarker = [];
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
    function handleSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        var address = formData.get('address');

        geocode(RequestType.ADDRESS, address)
        .then(({ results }) => {
            var { lat, lng } = results[0].geometry.location;
            setAddress({ lat, lng });

            axios.post('http://localhost:3001/find_location', {addr: address, geocode: { lat, lng }})
            .then(function (response) {
                for (var i=0; i<response.data.length; i++){
                    locationCoordinates.push({"addr": response.data[i].addr, "dist": response.data[i].distance});
                    locationMarker.push({ lat: response.data[i].lat, lng: response.data[i].lng });
                }
                setLocation(locationCoordinates);
                setLocationMarker(locationMarker);
            })
            .catch(function (error) {
                console.log(error);
            })
    })
    }


    return(
        <div className="searchBarWrapper">
            <form onSubmit={handleSubmit} className="searchBarForm">
                <input ref={ref} className="searchBar" name="address" type="text" placeholder="Enter Address or Zip"/>
                <button className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
    );
}





