import React, { useEffect, useState } from 'react';
import ExpenseForm from './../components/ExpenseForm';
import ExpenseTable from './../components/ExpenseTable';
import ExpenseSummary from './../components/ExpenseSummary';
import ExpenseChart from './../components/ExpenseChart';
import { Expense } from './../types/Expense';
import { getExpenses } from '../services/apiService';

const HomePage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

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

    useEffect(() => {
        // Filtrar los gastos según la categoría y el rango de fechas
        const filterExpenses = () => {
            let filtered = expenses;

            if (categoryFilter) {
                filtered = filtered.filter(expense => expense.category === categoryFilter);
            }

            if (startDate) {
                filtered = filtered.filter(expense => new Date(expense.date) >= new Date(startDate));
            }

            if (endDate) {
                filtered = filtered.filter(expense => new Date(expense.date) <= new Date(endDate));
            }

            setFilteredExpenses(filtered);
        };

        filterExpenses();
    }, [categoryFilter, startDate, endDate, expenses]);

    return (
        <div className="home-page">
            <header className="header">
                <h1>Seguimiento de Gastos Personales</h1>
            </header>
            <main className="content">
                <div className="summary-chart-container">
                    <ExpenseSummary expenses={filteredExpenses} />
                    <ExpenseChart expenses={expenses} />
                </div>
                <ExpenseForm setExpenses={setExpenses} editingExpense={editingExpense} setEditingExpense={setEditingExpense} />
                <div className="filters">
                    <select onChange={e => setCategoryFilter(e.target.value)} value={categoryFilter}>
                        <option value="">Todas las categorías</option>
                        <option value="Hogar">Hogar</option>
                        <option value="Alimento">Alimento</option>
                        <option value="Salud">Salud</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Otros">Otros</option>
                    </select>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <ExpenseTable expenses={filteredExpenses} setExpenses={setExpenses} setEditingExpense={setEditingExpense} />
            </main>
        </div>
    );
};

export default HomePage;
