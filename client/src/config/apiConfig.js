import axios from "axios";

// const ENVIRONMENT = process.env.ENVIRONMENT;
const PRODUCTION_API = "";
const DEVELOPMENT_API = "";
const LOCAL_API = "http://localhost:5000/api/";

let API_BASE_URL = LOCAL_API;

// switch (ENVIRONMENT) {
//   case "production":
//     API_BASE_URL = PRODUCTION_API;
//     break;
//   case "development":
//     API_BASE_URL = DEVELOPMENT_API;
//     break;
//   default:
//     break;
// }

export const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// API.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

export const getCategories = async () => {
  try {
    const response = await API.get("getCategories");
    return response;
  } catch (ex) {
    return ex.response.data;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await API.post("auth/login", { email, password });
    return response.data;
  } catch (ex) {
    return ex.response.data;
  }
};

export const createUser = async ({ name, email, phone, password }) => {
  try {
    return await API.post("auth/create", {
      name,
      email,
      phone,
      password,
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    return await API.post("auth/change-password", {
      oldPassword,
      newPassword,
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const getUserProfile = async () => {
  try {
    return await API.get("user/profile", {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const getProduct = async ({ pid }) => {
  try {
    return await API.get(`product/getProduct/${pid}`, {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const getCart = async () => {
  try {
    return await API.get("cart/get", {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const addItemCart = async ({ pid }) => {
  try {
    return await API.post("cart/add-item", {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
      pid,
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const removeItemCart = async ({ id }) => {
  try {
    return await API.delete(`cart/remove-item/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const getAddresses = async () => {
  try {
    return await API.get("addresses/get", {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const addAddress = async (
  phone,
  line1,
  line2,
  line3,
  pincode,
  landmark,
  name
) => {
  try {
    return await API.post("addresses/add", {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
      phone,
      line1,
      line2,
      line3,
      pincode,
      landmark,
      name,
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const removeAddress = async ({ id }) => {
  try {
    return await API.delete(`addresses/delete/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("jwtToken"),
      },
    });
  } catch (ex) {
    return ex.response.data;
  }
};

export const byCategory = async ({
  c,
  minp,
  minr,
  maxr,
  maxp,
  priceR,
  ratingR,
  s,
  page,
}) => {
  try {
    // return await API.get(`product/byCategory?c=${c}&maxp=${maxp}&minp=${minp}&maxr=${maxr}&minr=${minr}&s=${s}&page=${page}`)

    return await API.get(
      `product/byCategory?c=${c}&priceR=${priceR}&ratingR=${ratingR}&s=${s}&page=${page}`
    );
  } catch (ex) {
    return ex.response.data;
  }
};

export const bySearch = async ({
  search,
  minp,
  minr,
  maxr,
  maxp,
  priceR,
  ratingR,
  s,
  page,
}) => {
  try {
    // return await API.get(`product/bySearch?search=${search}&maxp=${maxp}&minp=${minp}&maxr=${maxr}&minr=${minr}&s=${s}&page=${page}`)
    return await API.get(
      `product/bySearch?search=${search}&priceR=${priceR}&ratingR=${ratingR}&s=${s}&page=${page}`
    );
  } catch (ex) {
    return ex.response.data;
  }
};
