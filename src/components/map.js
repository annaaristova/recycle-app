import { useEffect, useRef } from 'react';
import "../css-files/map.css";

export default function Map({locationMarker, location}) {

    var markers = [];

    const closestLocation = {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        size: new window.google.maps.Size(38, 38), 
        scaledSize: new window.google.maps.Size(38, 38), 
    };

    const myLocation = {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        size: new window.google.maps.Size(38, 38), 
        scaledSize: new window.google.maps.Size(38, 38), 
    };
    
    const position = { lat: 37.33809988023966, lng: -121.89857536983719 };
    const ref = useRef();

    useEffect(()=>{
        if (locationMarker){
            locationMarker.forEach((marker, index) => {
                if (index == 0){
                    markers.push({ lat: marker.lat, lng: marker.lng, color: myLocation, title: marker.addr })
                }
                else {
                    markers.push({ lat: marker.lat, lng: marker.lng, color: closestLocation, title: marker.addr })
                }
            });
        }
    }, [locationMarker]);

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
          center: position,
          zoom: 11,
        });

        var infowindow =  new window.google.maps.InfoWindow({
            map: map,
        });

        markers.map((mrkr) => {
            var marker = new window.google.maps.Marker({
                position:{ lat: mrkr.lat, lng: mrkr.lng }, 
                map,
                icon: mrkr.color,
                title: mrkr.title
            })
            marker.addListener("mouseover", () => {
                infowindow.setPosition({ lat: mrkr.lat, lng: mrkr.lng });
                infowindow.setContent(mrkr.title);
                infowindow.open({
                    map, 
                    anchor: marker});
            });
            marker.addListener("mouseout", () => {
                infowindow.close();
            });
        });

        if(markers[0] != null){
            var newCenter = new window.google.maps.LatLng(markers[0].lat, markers[0].lng);
            map.setCenter(newCenter);
        }
        
    });

    return (
        <div ref={ref} id="map"/>
    );
};





