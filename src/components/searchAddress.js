import searchSign from "../images/searchSign.png"
import {setKey, geocode, RequestType} from "react-geocode";
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import "../css-files/searchBar.css"


export default function SearchBarAddress({setLocation, setLocationMarker, setIsVisible}) {
    var locationCoordinates = [];
    var locationMarker = [];

    const ref = useRef();

    const [autoCompleteWidget, setAutoCompleteWidget] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (ref.current && !autoCompleteWidget){
            setAutoCompleteWidget(
                new window.google.maps.places.Autocomplete(ref.current, {   
                    fields: ['place_id'],
                    componentRestrictions: { country: 'US' },
            }))
        }
    }, [ref, autoCompleteWidget]);
    setKey("");

    function handleSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        var address = formData.get('address');

        geocode(RequestType.ADDRESS, address)
        .then(({ results, status }) => {
            if (status == "OK"){
                var { lat, lng } = results[0].geometry.location;
                locationMarker.push({ lat: lat, lng: lng, "addr": address})

                axios.post('http://localhost:3001/find_location', {addr: address, geocode: { lat, lng }})
                .then(function (response) {
                    for (var i=0; i<response.data.length; i++){
                        locationCoordinates.push({"addr": response.data[i].addr, "dist": response.data[i].distance, "time": response.data[i].time});
                        locationMarker.push({ lat: response.data[i].lat, lng: response.data[i].lng, "addr": response.data[i].addr });
                    }
                    setLocation(locationCoordinates);
                    setLocationMarker(locationMarker);
                    setIsVisible(true);
                })
                .catch(function (error) {
                    console.log(error);
                })
            } else {
                console.log('Invalid address or no results found');
              }
            })
        .catch((error) => {
            setErrorMessage(true);
            setTimeout(()=>{setErrorMessage(false);}, 3000);
            console.log('Error during geocoding request:', error);
        });
    }


    return(
        <div className="searchBarWrapper">
            <form onSubmit={handleSubmit} className="searchBarForm">
                <input ref={ref} className="searchBar" name="address" type="text" placeholder="Enter Address or Zip"/>
                <button className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
                {errorMessage && <div className='error'> Please enter valid address </div>}
            </form>
        </div>
    );
}





