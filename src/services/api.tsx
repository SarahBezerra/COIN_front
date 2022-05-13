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

interface SignUpData {
  email: string;
  username: string;
  password: string;
}

async function signUp(signUpData: SignUpData) {
  await baseAPI.post("/sign-up", signUpData);
}

interface SignInData {
  email: string;
  password: string;
}

async function signIn(signInData: SignInData) {
  await baseAPI.post("/sign-in", signInData);
}

const api = {
  signUp,
  signIn,
};

export default api;
