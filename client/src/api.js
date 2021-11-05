import axios from "axios";

const BASE_URL = "";

const axiosRequest = axios.create({
  baseUrl: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export const getCategories = async () => {
  try {
    const response = await axiosRequest.get("/api/getCategories");
    return response;
  } catch (ex) {
    return ex;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosRequest.post("/api/auth/login", {
          data: {
            email,
            password,
          },
        });
    return response;
  } catch (ex) {
    return ex;
  }
};

export const createUser = async (name, email, phone, password) => {
  try {
    const response = await axiosRequest.get("/api/auth/create", {
      data: {
        name,
        email,
        phone,
        password,
      },
    });
    return response;
  } catch (ex) {
    return ex;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axiosRequest.get("/api/auth/change-password", {
      data: {
        oldPassword,
        newPassword,
      },
    });
    return response;
  } catch (ex) {
    return ex;
  }
};
