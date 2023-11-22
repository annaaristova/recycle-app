import searchSign from "../../images/searchSign.png"
import {setKey, geocode, RequestType} from "react-geocode";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect, useRef } from 'react';


export default function SearchBarAddress() {
    const navigate = useNavigate();

    const ref = useRef();

    const [autoCompleteWidget, setAutoCompleteWidget] = useState(undefined);

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
        var location = [];
        var locationMarker = [];
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        var address = formData.get('address');

        geocode(RequestType.ADDRESS, address)
        .then(({ results }) => {
            var { lat, lng } = results[0].geometry.location;
            locationMarker.push({ lat: lat, lng: lng, "addr": address})
            axios.post('http://localhost:3001/find_location', {addr: address, geocode: { lat, lng }})
            .then(function (response) {
                for (var i=0; i<response.data.length; i++){
                    location.push({"addr": response.data[i].addr, "dist": response.data[i].distance, "time": response.data[i].time});
                    locationMarker.push({ lat: response.data[i].lat, lng: response.data[i].lng, "addr": response.data[i].addr });
                }
                navigate('/Redeem_Bev_Containers', { state: {location: location, locationMarker: locationMarker} });
            })
            .catch(function (error) {
                console.log(error);
            })
        })
    }

    return(
        <div onSubmit={handleSubmit} className="crv-search-wrapper">
            <form className="searchBarForm">
                <input ref={ref} className="crv-search" name="address" type="text" placeholder="Enter Address or Zip"/>
                <button className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
    );
}