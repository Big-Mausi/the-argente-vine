const API_URL = import.meta.env.VITE_API_URL;

export async function checkApiHealth(): Promise<string> {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Unable to connect to the API");
  }

  return response.text();
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactMessage(contactMessage: ContactMessage) {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactMessage),
  });

  if (!response.ok) {
    throw new Error("Unable to send your message");
  }

  return response.json();
}
