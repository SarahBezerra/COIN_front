import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

interface UserData {
  email: string;
  username: string;
  password: string;
}

async function signUp(signUpData: UserData) {
  await baseAPI.post("/sign-up", signUpData);
}

const api = {
  signUp,
};

export default api;
