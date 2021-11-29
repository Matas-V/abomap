import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import esriConfig from "@arcgis/core/config";
import Search from "@arcgis/core/widgets/Search";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";

const MapLayer = () => {
  const mapRef = useRef(null);
  esriConfig.apiKey = process.env.REACT_APP_MAP_API;
  
  useEffect(() => {
    const view = new MapView({
      container: mapRef.current,
      map: new Map({
        basemap: "arcgis-navigation",
      }),
      zoom: 6,
      center: [23.8813, 55.1694],
      constraints: { minZoom: 2 },
    });

    const search = new Search({
      view: view
    });
    view.ui.add(search, "top-right");

    // cia is duombazes i guess ateis koordinates
    const point = {
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

    view.graphics.add(
      new Graphic({
        geometry: point,
        symbol: symbol
      })
    );

    view.ui.add(
      new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
      }),
      "bottom-right");

  }, []);

  // koks tikslas sito?
  // const graphicsLayer = new GraphicsLayer();
  // map.add(graphicsLayer);
  // graphicsLayer.reorder(World_Basemap_v2, 0);

  return (
    <div id="viewDiv" ref={mapRef} style={{ width: '100%' }}>
      
    </div>
  )
}

export default MapLayer;