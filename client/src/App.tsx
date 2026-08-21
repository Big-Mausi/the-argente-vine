import { useEffect, useState } from "react";
import { checkApiHealth } from "./services/api";
function App() {
  const [apiStatus, setApiStatus] = useState("Checking API...");

  useEffect(() => {
    checkApiHealth()
      .then((message) => {
        setApiStatus(message);
      })
      .catch(() => {
        setApiStatus("Unable to connect to API");
      });
  }, []);
  return (
    <main className="container py-5">
      <h1>The Argenté Vine</h1>

      <p>Restaurant web application</p>

      <p className="mt-4">
        API Status: <strong>{apiStatus}</strong>
      </p>
    </main>
  );
}

export default App;
