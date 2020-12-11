import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";
import FullscreenControl from "react-leaflet-fullscreen";

function Map({ countries, casesType, center, zoom }) {
    //console.log("Map=>", center, zoom);
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contribution'
                />

                {/* loop through countries and draw circles in map */}
                {showDataOnMap(countries, casesType)}
                <FullscreenControl position="topright" />
            </LeafletMap>
        </div>
    );
}

export default Map;
