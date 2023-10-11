import searchSign from "../../images/searchSign.png"
import "../../css-files/searchBar.css";
import { usePlacesWidget } from "react-google-autocomplete";
import {setKey, geocode, RequestType} from "react-geocode";
import { useNavigate } from 'react-router-dom';

export default function SearchBarAddress() {
    const navigate = useNavigate();

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

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        var address = formData.get('address');
        
        geocode(RequestType.ADDRESS, address)
        .then(({ results }) => {
            var {lat, lng} = results[0].geometry.location;
            navigate('/RedeemBeverageContainersForCRVRefund', { state: {latitude: lat, longitude: lng} });
        })
    };

    return(
        <div onSubmit={handleSubmit} className="searchBarWrapper">
            <form className="searchBarForm">
                <input ref={ref} className="searchBar" name="address" type="text" placeholder="Enter Address or Zip"/>
                <button /*onClick={navigatePage}*/ className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
    );
}