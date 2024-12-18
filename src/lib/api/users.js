import { sha256 } from "crypto-hash";
import { makeRequest } from "./common";

const findByEmailPassword = async (email, password) => {
  const params = new URLSearchParams({ email, password });

  const users = await makeRequest({ endpoint: `users?${params.toString()}` });

  if (users.length === 0) {
    return null;
  }

  const [user] = users;

  return user;
};

const findByEmail = async (email) => {
  const users = await makeRequest({ endpoint: `users?email=${email}` });

  if (users.length === 0) {
    return null;
  }

  const [user] = users;

  return user;
};

const findById = async (id) => {
  const users = await makeRequest({ endpoint: `users?id=${id}` });

  if (users.length === 0) {
    return null;
  }

  const [user] = users;

  return user;
};

const register = async (email, password) => {
  const user = {
    id: Math.random().toString(36).slice(2),
    email,
    password: await sha256(password),
    createdAt: new Date().toISOString(),
  };

  const result = await makeRequest({
    endpoint: "users",
    method: "POST",
    body: user,
  });

  return result;
};

const login = async (email, password) => {
  const data = {
    email,
    password: await sha256(password),
  };

  const result = await findByEmailPassword(data.email, data.password);

  return result;
};

export const users = {
  findByEmailPassword,
  findByEmail,
  findById,
  register,
  login,
};
