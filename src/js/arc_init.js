function initArc() {
  return new Promise((resolve) => {
    require([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
    ], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
      resolve({
        esriConfig,
        Map,
        MapView,
        Graphic,
        GraphicsLayer,
      });
    });
  });
}
