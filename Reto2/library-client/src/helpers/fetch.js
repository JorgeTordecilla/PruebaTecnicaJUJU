const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithOutToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  if (method !== "GET") {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  return fetch(url);
};

const fetchWithToken = (endpoint, data, method = "GET") => {
  const token = localStorage.getItem("token") || "";
  const url = `${baseUrl}/${endpoint}`;
  if (method !== "GET") {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
  return fetch(url, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
};

export { fetchWithOutToken , fetchWithToken  };
