import React from "react";
import { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMaps() {
    const [coordsinates, setCoordsinates] = useState({ lat: 32.109333, lng: 34.855499 })
    const zoom = 11

    function onPanTo(coords) {
        console.log(coords);
        const { lat, lng } = coords
        setCoordsinates({ lat, lng })
    }

    const telAvivCoords = { lat: 32.088817, lng: 34.772564 }
    const afulaCoords = { lat: 32.609690, lng: 35.287777 }
    const eilatCoords = { lat: 29.5260095626, lng:34.9375862496}
    return (

        // Important! Always set the container height explicitly
        <div className="google-map" style={{ height: '80vh', width: '80%' }}>
            <label className="places-btns" htmlFor=""> Our Stores: </label>
            <div className="places-btns">
                <button className="tel-aviv-btn btn" onClick={() => onPanTo(telAvivCoords)}>Tel Aviv</button>
                <button className="afula-btn btn" onClick={() => onPanTo(afulaCoords)}>Afula</button>
                <button className="herz-btn btn" onClick={() => onPanTo(eilatCoords)}>Eilat</button>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDHZMtrgu1TOz0VEmOmvFf9_DPHKXvs3Gw" }}
                defaultCenter={coordsinates}
                defaultZoom={zoom}
                center={coordsinates}
            >
                <AnyReactComponent
                    lat={coordsinates.lat}
                    lng={coordsinates.lng}
                    text="🚩"
                />
            </GoogleMapReact>
        </div>
    );
}