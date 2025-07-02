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

// map.addSource('Wandeling', {
//     type: 'geojson',
//     data: './assets/wandeling.geojson'
// });

map.on('load', () => {
    map.addSource('route', {
        'type': 'geojson',
        data: './assets/wandeling.geojson'
    }
    );
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