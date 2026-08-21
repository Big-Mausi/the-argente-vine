const API_URL = import.meta.env.VITE_API_URL;

export async function checkApiHealth(): Promise<string> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Unable to connect to the API");
  }

  return response.text();
}
