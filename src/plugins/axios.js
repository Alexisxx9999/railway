import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

/* const fetchCsrfToken = async () => {
  try {
    const response = await axios.get("http://localhost:9000/csrf-token");
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

const configureAxios = async () => {
  const csrfToken = await fetchCsrfToken();
  if (csrfToken) {
    instance.defaults.headers.common["X-CSRF-Token"] = csrfToken;
    console.log("CSRF Token configured:", csrfToken);
  }
};

configureAxios(); */

export default instance;
