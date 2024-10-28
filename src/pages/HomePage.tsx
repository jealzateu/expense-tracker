import React, { useEffect, useState } from 'react';
import ExpenseForm from './../components/ExpenseForm';
import { Expense } from './../types/Expense';
import { getExpenses } from '../services/apiService';

const HomePage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    useEffect(() => {
        // Carga inicial de datos desde la API
        const fetchExpenses = async () => {
            try {
                const response = await getExpenses();
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);


    return (
        <div className="home-page">
            <header className="header">
                <h1>Seguimiento de Gastos Personales</h1>
            </header>
            <main className="content">
                <ExpenseForm setExpenses={setExpenses} editingExpense={editingExpense} setEditingExpense={setEditingExpense} />
            </main>
        </div>
    );
};

export default HomePage;
