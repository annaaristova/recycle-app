import Header from "../../components/header";
import Footer from "../../components/footer";
import Location from "../../components/locationForRedeemPage";
import "../../css-files/searchDiv.css";
import SearchBarAddress from "../../components/searchBarAddress";
import {useState} from "react";

export default function Index() {

    const [location, setLocation] = useState([]);

    const getLocation = (locationArray) => {
        setLocation(locationArray); 
    }

    return (
        <div id="container">
            <Header/>
            <main>
                <div id="searchDiv">
                    <h2 id="searchDivFont">Redeem Beverage Containers For CRV Refund</h2>
                    <p>Bla bla bla</p>
                    <SearchBarAddress location={location} setLocation={getLocation}/>
                </div>
                <Location location={location}/>
            </main>
            <Footer/>
        </div>
    );
}