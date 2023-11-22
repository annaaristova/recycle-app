import Header from "../../components/header";
import Footer from "../../components/footer";
import Location from "../../components/locations";
import SearchBarAddress from "../../components/searchAddress";
import {useState} from "react";
import Map from "../../components/map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "../../css-files/searchDiv.css";


export default function Index() {

    const [location, setLocation] = useState([]);
    const getLocation = (locationArray) => {
        setLocation(locationArray); 
    }

    const [locationMarker, setLocationMarker] = useState([]);
    const getLocationMarker = (locationMarkerArray) => {
        setLocationMarker(locationMarkerArray); 
    }

    const [isVisible, setIsVisible] = useState(false);
    const getVisible = (Boolean) => {
        setIsVisible(true);
    }

    var {state} = useLocation();

    useEffect(()=>{
        if (state){
            setLocation(state.location);
            setLocationMarker(state.locationMarker);
            window.history.replaceState(null, '');
            setIsVisible(true);
        }
    }, [state]);

    const render = (status) => {
        switch (status) {
          case Status.LOADING:
            return <h3>{status} ..</h3>;
          case Status.FAILURE:
            return <h3>{status} ..</h3>;
          case Status.SUCCESS:
            return <Map/>;
        }
    };

    return (
        <div id="container">
            <Header/>
            <main>
                <Wrapper apiKey={""} libraries={["places"]} render={render}>
                    <div id="searchDiv">
                        <div id="info">
                            <p>There are 1,260 recycling centers statewide that buy back empty California Refund Value (CRV) beverage containers. Most beverages sold in glass, plastic, or metal (other than milk, wine, distilled spirits and medical food containers) are subject to CRV.
                                <br></br>
                                <br></br>
                                The list below includes items that are eligible for a CRV refund.
                            </p>
                            <ul class="list">
                                <li>Carbonated Soft Drinks</li>
                                <li>Beer & Malt Beverages</li>
                                <li>Water & Mineral Water</li>
                                <li>Sports Drinks</li>
                                <li>Noncarbonated Fruit Drinks</li>
                                <li>Carbonated Fruit Drinks</li>
                                <li>Noncarbonated Soft Drinks</li>
                                <li>Vegetable Juice (Less than 16 oz)</li>
                                <li>Carbonated Water</li>
                                <li>Wine & Distilled Spirit Coolers</li>
                                <li>Coffee Beverages</li>
                                <li>Tea Beverages</li>
                            </ul>
                            <p>Enter your address to find the nearest CRV locations</p>
                            <SearchBarAddress setLocation={getLocation} setLocationMarker={getLocationMarker} setIsVisible={getVisible} />
                        </div>
                        
                    </div>
                    <Map locationMarker={locationMarker} location={location} />
                </Wrapper>
                {isVisible ? <Location location={location} /> : null}
            </main>
            <Footer/>
        </div>
    );
}
