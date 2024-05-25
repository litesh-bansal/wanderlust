

mapboxgl.accessToken = mapToken; 
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: allList.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// console.log(coordinates);
const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 30 })
        .setLngLat(allList.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${allList.title}</h4><p>${allList.location}</p><p>Exact location will be provided after booking`)
        .setMaxWidth("300px"))
        .addTo(map);


