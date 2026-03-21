const output = document.getElementById("output");

async function callApi(path) {
  output.textContent = `Loading ${path}...`;

  try {
    const response = await fetch(path, {
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();
    output.textContent = `HTTP ${response.status}\n${text}`;
  } catch (error) {
    output.textContent = `Request failed\n${error}`;
  }
}

document.getElementById("health-button").addEventListener("click", () => {
  callApi("/api/health");
});

document.getElementById("state-button").addEventListener("click", () => {
  callApi("/api/state");
});

