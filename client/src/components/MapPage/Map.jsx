import React from 'react';
import { esriConfig, Map, MapView, BasemapToggle, Graphic, GraphicsLayer, PictureMarkerSymbol, Search } from '@arcgis/core';

const MapLayer = () => {

  esriConfig.apiKey = process.env.REACT_APP_MAP_API;

  const map = new Map({
    basemap: "arcgis-navigation" // Basemap layer service
  });
        
  const view = new MapView({
    map: map,
    center: [23.8813, 55.1694], // Longitude, latitude
    zoom: 6, // Zoom level
    container: "viewDiv" // Div element
  });
  view.constraints = {
  minZoom: 2
  };
  const search = new Search({
    view: view
  });
  view.ui.add(search, "top-right");

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);
  const point = { //Create a point
    type: "point",
    longitude: 24.377460,
    latitude: 55.735026
  };
  
  var symbol = {
    type: "picture-marker",
    url: "https://res.cloudinary.com/dvsrvp11e/image/upload/v1635156583/icons/red_pointer_csx9nh.png",
    width: "31px",
    height: "44px",
    yoffset: "22px"
  };


  var pointGraphic = new Graphic({
    geometry: point,
    symbol: symbol
  });
  view.graphics.add(pointGraphic);

  const basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "arcgis-imagery"
  });
  view.ui.add(basemapToggle,"bottom-right");

  // graphicsLayer.reorder(World_Basemap_v2, 0);

  return (
    <div id="viewDiv">
      
    </div>
  )
}

export default MapLayer;