import axios from 'axios';
import { Expense } from '../types/Expense';

const API_URL = 'http://localhost:5000/expenses';

export const getExpenses = () => axios.get<Expense[]>(API_URL);

export const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const response = await axios.get<Expense[]>(API_URL);
    const expenses = response.data;
    const newId = expenses.length > 0 ? Math.max(...expenses.map(exp => exp.id)) + 1 : 1;
    return axios.post<Expense>(API_URL, { ...expense, id: String(newId) });
};

export const updateExpense = (id: number, updatedExpense: Expense) => axios.put<Expense>(`${API_URL}/${id}`, updatedExpense);

export const deleteExpense = (id: number) => axios.delete(`${API_URL}/${id}`);
