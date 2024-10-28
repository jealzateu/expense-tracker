import React, { useState, useEffect } from 'react';
import { Expense, ExpenseFormProps } from '../types/Expense';
import { addExpense, updateExpense } from './../services/apiService';

const formatNumber = (num: string): string => {
    const parts = num.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${integerPart}.${parts[1].slice(0, 2)}` : integerPart; // Limitar a 2 decimales
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ setExpenses, editingExpense, setEditingExpense }) => {
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (editingExpense) {
            setAmount(editingExpense.amount.toString());
            setCategory(editingExpense.category);
            setDate(editingExpense.date);
            setDescription(editingExpense.description ?? '');
        }
    }, [editingExpense]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedAmount = parseFloat(amount.replace(/,/g, ''));

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Por favor, ingresa un monto válido (número mayor a 0).');
            return;
        }

        const newExpense: Omit<Expense, 'id'> = {
            amount: Number(amount),
            category,
            date,
            description,
        };

        if (editingExpense) {
            await updateExpense(editingExpense.id, { ...editingExpense, ...newExpense });
            setExpenses(prevExpenses =>
                prevExpenses.map(expense =>
                    expense.id === editingExpense.id ? { ...expense, ...newExpense } : expense
                )
            );
            setEditingExpense(null);
        } else {
            const response = await addExpense(newExpense);
            setExpenses(prevExpenses => [...prevExpenses, response.data]);
        }

        // Resetear el formulario
        setAmount('');
        setCategory('');
        setDate('');
        setDescription('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <input
                type="text"
                value={formatNumber(amount)} 
                onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    if (/^\d*\.?\d*$/.test(value)) {
                        setAmount(value);
                        setError('');
                    }
                }}
                placeholder="Monto"
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Selecciona una categoría</option>
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción (opcional)"
            />
            <div className="button-container">
                {editingExpense ? (
                    <>
                        <button type="submit" className="btn-update">Actualizar</button>
                        <button type="button" onClick={() => setEditingExpense(null)} className="btn-cancel">Cancelar</button>
                    </>
                ) : (
                    <button type="submit" className="btn-add">Agregar Gasto</button>
                )}
            </div>
        </form>
    );
};

export default ExpenseForm;
