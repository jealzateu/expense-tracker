import { Expense } from './../types/Expense';

export const calculateExpensesByCategory = (expenses: Expense[]) => {
    return expenses.reduce((acc, { category, amount }) => {
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {} as Record<string, number>);
};
