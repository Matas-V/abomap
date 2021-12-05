import React, { useRef, useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import esriConfig from "@arcgis/core/config";
import Search from "@arcgis/core/widgets/Search";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Handles from '@arcgis/core/core/Handles';

import { useGetPlacesQuery } from '../../features/placesApi';

const MapLayer = ({ setDisplayId, setInfoOpen }) => {
  const { data } = useGetPlacesQuery();
  const mapRef = useRef(null);
  esriConfig.apiKey = process.env.REACT_APP_MAP_API;
  
  useEffect(() => {
    const handles = new Handles();

    const glMain = new GraphicsLayer({ id: "glMain" });

    const view = new MapView({
      container: mapRef.current,
      map: new Map({
        basemap: "arcgis-navigation",
        layers: [glMain],
      }),
      highlightOptions: {
        color: [255, 255, 255],
        fillOpacity: 0.2
      },
      zoom: 6,
      center: [23.8813, 55.1694],
      constraints: { minZoom: 2 },
      popup: { autoOpenEnabled: false }
    });

    view.ui.add(new Search({ view: view }), "top-right");
    
    var symbol = {
      type: "picture-marker",
      url: "https://res.cloudinary.com/dvsrvp11e/image/upload/v1635156583/icons/red_pointer_csx9nh.png",
      width: "31px",
      height: "44px",
      yoffset: "22px",
    };

    const layer = view.map.findLayerById("glMain");

    if (layer) {
      for (let i=0; i<data?.length; i++) {
        const point = {
          type: "point",
          longitude: data[i].coords.lon,
          latitude: data[i].coords.lat,
        };
        const graphic = new Graphic({
          geometry: point,
          symbol: symbol,
          attributes: {
            id: data[i]._id,
            // situs duomenis vel fetchinami gaunam
            // title: data[i].title,
            // description: data[i].description,
            // photos: data[i].photos,
          },
          popupTemplate: { },
        })
        layer.add(graphic);
      }
    }

    view.when().then(() => {
      view.on("click", (event) => {
        view.popup.fetchFeatures(event).then((response) => {
          
          response.promisesPerLayerView.forEach((fetchResult) => {
            const layerView = fetchResult.layerView;

            fetchResult.promise.then((graphics) => {
              if (graphics.length > 0) {
                const { id } = graphics[0].attributes;
                setDisplayId(id);
                setInfoOpen(true);
                graphics.forEach((graphic) => {
                  if (typeof layerView.highlight === "function") {
                    handles.removeAll();
                    handles.add(layerView.highlight(graphic));
                  }
                })
              }
            })
          })
        })
      })
    });

    view.ui.add(
      new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
      }),
      "bottom-right");

  }, [data]);

  return (
    <div id="viewDiv" ref={mapRef} style={{ width: '100%' }}>
      
    </div>
  )
}

export default MapLayer;