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
  userId: number;
  color: string;
  icon: string;
}

interface Deposit {
  userId: number;
  id: number;
  title: string;
  description: string;
  price: number;
  date: Date;
}

type CreateDeposit = Omit<Deposit, "id" | "userId">;

interface Payment {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
  date: Date;
  category: string;
}

interface MonthlyPlanning {
  id: number;
  userId: number;
  month: number;
  year: number;
  roof: number;
  outlay: number;
}

type CreatePayment = Omit<Payment, "id" | "userId">;

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

async function createPayment(paymentData: CreatePayment, token: string) {
  const accessToken = getConfig(token)
  return baseAPI.post("/create-payment", paymentData, accessToken);
}

async function getPayments(token: string) {
  const accessToken = getConfig(token)
  return baseAPI.get<Payment[]>("/payments", accessToken);
}

async function getMonthlyPlanning(token: string, month: number, year: number) {
  const accessToken = getConfig(token)
  return baseAPI.get<MonthlyPlanning>(`/monthlyPlanning/${year}/${month}`, accessToken);
}

async function updateMonthlyPlanning(token: string, year: number, month: number, limit: number) {
  const accessToken = getConfig(token)
  return baseAPI.put(`/monthlyPlanning/${year}/${month}`, {limit}, accessToken);
}

const api = {
  signUp,
  signIn,
  getCategories,
  createDeposit,
  createPayment,
  getPayments,
  getMonthlyPlanning,
  updateMonthlyPlanning,
};

export default api;
