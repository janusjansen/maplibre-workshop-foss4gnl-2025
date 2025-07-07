//import * as maplibregl from "https://esm.sh/maplibre-gl";
import * as maplibregl from "https://cdn.skypack.dev/maplibre-gl";
import { Protocol } from "https://esm.sh/pmtiles";
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const map = new maplibregl.Map({
    container: 'mijnkaart',
    style: './assets/style.json',
    center: [5.66509, 51.96857],
    zoom: 13 // starting zoom
});

map.on('load', () => {
    map.addSource('route', {
        'type': 'geojson',
        data: './assets/wandeling.geojson'
    }
    );

  map.addSource('luchtfoto', {
  type: 'raster',
  tiles: [
    'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/OGC:1.0:GoogleMapsCompatible/{z}/{x}/{y}.jpeg'
  ],
  tileSize: 256,
  attribution: 'Luchtfoto © PDOK',
});

map.addLayer({
  id: 'luchtfoto',
  type: 'raster',
  source: 'luchtfoto',
  layout: { visibility: 'none' }  // standaard uit
});
    map.addLayer({
        'id': 'route-halo',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#ffffff',
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10, 5,
                15, 12
            ]
        }
    });

    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#0066cc',
            'line-opacity': 0.85,
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10, 3,
                15, 8
            ]
        }
    });

});

document.getElementById('basemap').addEventListener('change', (e) => {
  const value = e.target.value;

  // Zet zichtbaarheid van luchtfoto aan/uit
  map.setLayoutProperty('luchtfoto', 'visibility', value === 'luchtfoto' ? 'visible' : 'none');

  // Zet alle vectorlagen (uit protomaps pmtiles) aan/uit
  const allLayers = map.getStyle().layers;
  allLayers.forEach(layer => {
    if (layer.source === 'protomaps') {
      map.setLayoutProperty(layer.id, 'visibility', value === 'protomaps' ? 'visible' : 'none');
    }
  });
  console.log(map.getStyle().layers.filter(l => l.source === 'protomaps'));
});

// Handle style switching
document.getElementById('styleSwitcher').addEventListener('change', (e) => {
  const newStyle = e.target.value;
  map.setStyle(newStyle);
});
