// src/api/tasks.ts
import axios from "axios";

const API_URL = "http://localhost:3000/tasks"; // Backend server manzili

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: any) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
