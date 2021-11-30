import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import esriConfig from "@arcgis/core/config";
import Search from "@arcgis/core/widgets/Search";
import Graphic from "@arcgis/core/Graphic";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";

const MapLayer = ({ form, setForm }) => {
  const mapRef = useRef(null);
  esriConfig.apiKey = process.env.REACT_APP_MAP_API;
  let coordsRef = useRef(form.coords.lat ? { lat: form.coords.lat, lon: form.coords.lon } : null);
  
  useEffect(() => {
    let view = new MapView({
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

    view.on("click", (e) => {
      if (view.graphics.items.length > 0) {
        view.graphics.remove(view.graphics.items[0])
      }
      const newPoint = {
        type: "point",
        longitude: e.mapPoint.longitude,
        latitude: e.mapPoint.latitude,
      };
      
      var pointGraphic = new Graphic({
        geometry: newPoint,
        symbol: symbol
      });
      view.graphics.add(pointGraphic);
      coordsRef.current = {...form, coords: {
        lon: view.graphics.items[0].geometry.longitude, lat: view.graphics.items[0].geometry.latitude,
      }}
      setForm(coordsRef.current);
    });

    var symbol = {
      type: "picture-marker",
      url: "https://res.cloudinary.com/dvsrvp11e/image/upload/v1635156583/icons/red_pointer_csx9nh.png",
      width: "31px",
      height: "44px",
      yoffset: "22px"
    };
    
    try {
      view.graphics.add(new Graphic({
        geometry: {
          type: 'point', latitude: coordsRef.current.lat, longitude: coordsRef.current.lon,
        },
        symbol: symbol
      }));
    } catch (error) {
      
    }

    view.ui.add(
      new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
      }), "bottom-right");
  }, []);

  return (
    <div id="viewDiv" ref={mapRef} style={{ width: '900px', height: '550px' }}>
      
    </div>
  )
}

export default MapLayer;