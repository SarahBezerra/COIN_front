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
  return baseAPI.post<{ token: string }>("/sign-in", signInData);
}

export interface Category {
  id: number;
  name: string;
}

async function getCategories(token: string) {
  const accessToken = getConfig(token)
  return baseAPI.get<Category[]>("/categories", accessToken);
}

const api = {
  signUp,
  signIn,
  getCategories,
};

export default api;
