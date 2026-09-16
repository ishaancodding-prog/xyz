// Standard OpenStreetMap base layer
const cleanMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,         // How far the user is allowed to zoom in
    maxNativeZoom: 19,   // Max zoom level available on the server
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
});

// Satellite imagery layer with administrative boundaries
const satelliteHybrid = L.layerGroup([
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 22,
        maxNativeZoom: 17, // Esri satellite often stops at 17/18 in some regions
        attribution: 'Tiles &copy; Esri'
    }),
    L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 22,
        maxNativeZoom: 18
    })
]);
