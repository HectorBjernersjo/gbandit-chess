import { useState, useEffect } from "react";

export default function Health() {
  const [output, setOutput] = useState("Loading /api/health...");

  useEffect(() => {
    fetch("/api/health", { headers: { Accept: "application/json" } })
      .then(async (res) => {
        const text = await res.text();
        setOutput(`HTTP ${res.status}\n${text}`);
      })
      .catch((err) => setOutput(`Request failed\n${err}`));
  }, []);

  return (
    <section>
      <h1>API Health</h1>
      <pre className="output">{output}</pre>
    </section>
  );
}
