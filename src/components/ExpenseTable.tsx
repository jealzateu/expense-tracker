import React from 'react';
import { Expense, ExpenseTableProps } from '../types/Expense';
import { deleteExpense } from '../services/apiService';

const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, setExpenses, setEditingExpense }) => {
    const handleDelete = async (id: number) => {
        await deleteExpense(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const handleEdit = (expense: Expense) => {
        setEditingExpense(expense);
    };

    return (
        <table className="expense-table">
            <thead>
                <tr>
                    <th>Monto</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => (
                    <tr key={expense.id}>
                        <td>${formatNumber(expense.amount)}</td>
                        <td>{expense.category}</td>
                        <td>{expense.date}</td>
                        <td>{expense.description}</td>
                        <td>
                            <button onClick={() => handleEdit(expense)} className="btn-edit">Editar</button>
                            <button onClick={() => handleDelete(expense.id)} className="btn-delete">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExpenseTable;
