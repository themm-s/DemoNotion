export const API_URL = "http://localhost:3000";

export const makeRequest = ({ endpoint, body, method = "GET" }) =>
  fetch(`${API_URL}/${endpoint}`, {
    method,
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something wen't wrong");
      }

      return res;
    })
    .then((r) => r.json());
