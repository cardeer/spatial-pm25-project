function createMap(arc) {
  arc.esriConfig.apiKey =
    "AAPK596242f22e3a476e9c2a1659626be854f9fQF1t8sL3UB8Nn-03XSnxrWFx3Z4FmxlH4lBlENqp3dHn5VuKO18w5k1VE4T7E";

  const map = new arc.Map({
    basemap: "arcgis-dark-gray", // Basemap layer service
  });

  const view = new arc.MapView({
    map: map,
    // center: [data[0].longitude, data[0].latitude], // Longitude, latitude
    zoom: 3, // Zoom level
    container: "map", // Div element
  });

  const graphicsLayer = new arc.GraphicsLayer();
  map.add(graphicsLayer);

  return graphicsLayer;
}

function plot(map, data) {
  map.removeAll();

  data.forEach((e) => {
    const geometry = {
      type: "point",
      longitude: e.longitude,
      latitude: e.latitude,
    };

    const symbol = {
      type: "simple-marker",
      color: e.color_pm25,
      outline: null,
      size: "10px",
    };

    const graphic = new arc.Graphic({
      geometry,
      symbol,
      popupTemplate: {
        title: `${e.city} - ${e.country}`,
        content: `
          <p>Year: ${e.Year}</p>
          <p class="mb-0">PM 2.5: <span style="color: ${e.color_pm25}">${e.pm25}</span></p>
          `,
      },
    });

    map.add(graphic);
  });
}

function plot2(map, data) {
  map.removeAll();

  data.forEach((e) => {
    const geometry = {
      type: "point",
      longitude: e.longitude,
      latitude: e.latitude,
    };

    const symbol = {
      type: "simple-marker",
      color: "white",
      outline: null,
      size: "10px",
    };

    const graphic = new arc.Graphic({
      geometry,
      symbol,
      popupTemplate:
        e.city && e.country
          ? {
              title: `${e.city} - ${e.country}`,
            }
          : null,
    });

    map.add(graphic);
  });
}

async function submit(type) {
  queryTypes[type](map);
}

const queryTypes = {
  0: async (map) => {
    const { data } = await axios.get(
      "http://localhost:3000/api/map/get-all-data"
    );

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot(map, data);
  },
  1: async (map, value) => {
    const { data } = await axios.get("http://localhost:3000/api/map/5a", {
      params: {
        year: document.querySelector(`#q5a`).value,
      },
    });

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot2(map, data);
  },
  2: async (map) => {
    const { data } = await axios.get("http://localhost:3000/api/map/5b");

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot2(map, data);
  },
  3: async (map) => {
    const { data } = await axios.get("http://localhost:3000/api/map/5c");

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot2(map, data);
  },
  4: async (map) => {
    const { data } = await axios.get("http://localhost:3000/api/map/5d");

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot2(map, data);
  },
  5: async (map) => {
    const { data } = await axios.get("http://localhost:3000/api/map/5e");

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot2(map, data);
  },
  6: async (map) => {
    const { data } = await axios.get("http://localhost:3000/api/map/5f", {
      params: {
        year: document.querySelector(`#q5f`).value,
      },
    });

    if (data.length === 0) {
      alert("No data");
      return;
    }

    plot2(map, data);
  },
};
