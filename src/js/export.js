let previewData;

async function submit(type) {
  queryTypes[type]();
}

function updatePreview() {
  document.querySelector("#table-wrapper").style.display = "block";

  const header = document.querySelector("table thead tr");
  const body = document.querySelector("table tbody");

  header.innerHTML = "";
  body.innerHTML = "";

  const keys = Object.keys(previewData[0]);

  keys.forEach((e) => {
    const col = document.createElement("th");
    col.innerText = e;
    header.appendChild(col);
  });

  previewData.forEach((e) => {
    const tr = document.createElement("tr");
    keys.forEach((k) => {
      const col = document.createElement("td");
      col.innerText = e[k];
      tr.appendChild(col);
    });
    body.appendChild(tr);
  });
}

const queryTypes = {
  1: async () => {
    const { data } = await axios.get("http://localhost:3000/api/4a");
    previewData = data;
    updatePreview();
  },
  2: async () => {
    const { data } = await axios.get("http://localhost:3000/api/4b");
    previewData = data;
    updatePreview();
  },
  3: async () => {
    const { data } = await axios.get("http://localhost:3000/api/4c", {
      params: {
        country: document.querySelector("#country").value,
      },
    });
    previewData = data;
    updatePreview();
  },
  4: async () => {
    const { data } = await axios.get("http://localhost:3000/api/4d", {
      params: {
        year: document.querySelector("#year").value,
        color: document.querySelector("#color").value,
      },
    });
    previewData = data;
    updatePreview();
  },
};

async function toExcel() {
  const { data } = await axios.post("http://localhost:3000/api/download", {
    data: JSON.stringify(previewData),
  });

  window.open(`http://localhost:3000/api/download?id=${data}`);
}
