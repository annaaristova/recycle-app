import Header from "../../components/header";
import Footer from "../../components/footer";
import Location from "../../components/locations";
import "../../css-files/searchDiv.css";
import SearchBarAddress from "../../components/searchAddress";
import {useState} from "react";
import Map from "../../components/map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Index() {

    const [location, setLocation] = useState([]);
    const getLocation = (locationArray) => {
        setLocation(locationArray); 
    }

    const [locationMarker, setLocationMarker] = useState([]);
    const getLocationMarker = (locationMarkerArray) => {
        setLocationMarker(locationMarkerArray); 
    }

    const [address, setAddress] = useState([]);
    const getAddress = (addressCoordinate) => {
        setAddress(addressCoordinate); 
    }

    const {state} = useLocation();

    useEffect(()=>{
        if (state){
            setLocation(state.location)
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
                <div id="searchDiv">
                    <h2 id="searchDivFont">Redeem Beverage Containers For CRV Refund</h2>
                    <p>Bla bla bla</p>
                    <SearchBarAddress setAddress={getAddress} setLocation={getLocation} setLocationMarker={getLocationMarker} />
                </div>
                <Wrapper apiKey={"AIzaSyCVcqqye1VCgmrmWvcAjV9YLWRk4pb_k3Q"} render={render}>
                    <Map address={address} locationMarker={locationMarker} setLocation={getLocation}/>
                </Wrapper>
                <Location location={location}/>
            </main>
            <Footer/>
        </div>
    );
}
