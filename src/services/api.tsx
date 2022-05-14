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

interface SignInData {
  email: string;
  password: string;
}

interface Category {
  id: number;
  name: string;
}

interface Deposit {
  id: number;
  title: string;
  description: string;
  price: number;
  date: Date;
}

type CreateDeposit = Omit<Deposit, "id">;

async function signUp(signUpData: SignUpData) {
  await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData: SignInData) {
  return baseAPI.post<{ token: string }>("/sign-in", signInData);
}

async function getCategories(token: string) {
  const accessToken = getConfig(token)
  return baseAPI.get<Category[]>("/categories", accessToken);
}

async function createDeposit(depositData: CreateDeposit, token: string) {
  const accessToken = getConfig(token)
  return baseAPI.post("/create-deposit", depositData, accessToken);
}

const api = {
  signUp,
  signIn,
  getCategories,
  createDeposit,
};

export default api;
