import searchSign from "../../images/searchSign.png"
import "../../css-files/searchBar.css";
import { usePlacesWidget } from "react-google-autocomplete";
import { useNavigate } from "react-router-dom";

export default function SearchBarAddress() {
    const navigate = useNavigate();

    const navigateRedeemPage =() => {
        navigate("/RedeemBeverageContainersForCRVRefund")
    }

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

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        var address = formData.get('address');
        alert(address);
    };

    return(
        <div onSubmit={handleSubmit} className="searchBarWrapper">
            <form className="searchBarForm">
                <input ref={ref} className="searchBar" type="text" placeholder="Enter Address or Zip"/>
                <button onClick={navigateRedeemPage} className="button" type="submit"><img src={searchSign} alt="Search Icon" height="20" width="20"/></button>
            </form>
        </div>
    );
}