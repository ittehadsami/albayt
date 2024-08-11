import originalAxios from "axios";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1";
const axios = () => {
  const defaultOptions = {
    baseURL,
  };
  const instance = originalAxios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    try {
      const jsonString = localStorage.getItem("admin");
      const token = jsonString && JSON.parse(jsonString);
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error while setting Authorization header:", error);
    }
    return request;
  });

  return instance;
};
export default axios();
