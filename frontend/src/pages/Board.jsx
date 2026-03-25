import { useState, useEffect } from "react";

export default function Board() {
  const [output, setOutput] = useState("Loading /api/state...");

  useEffect(() => {
    fetch("/api/state", { headers: { Accept: "application/json" } })
      .then(async (res) => {
        const text = await res.text();
        setOutput(`HTTP ${res.status}\n${text}`);
      })
      .catch((err) => setOutput(`Request failed\n${err}`));
  }, []);

  return (
    <section>
      <h1>Board State</h1>
      <pre className="output">{output}</pre>
    </section>
  );
}
