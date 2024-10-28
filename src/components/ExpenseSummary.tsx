import React from 'react';
import { Expense } from '../types/Expense';
import { calculateExpensesByCategory } from '../utils/utils';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const byCategory = calculateExpensesByCategory(expenses);

  return (
    <div>
      <h3>Total Gastos: ${formatNumber(total)}</h3>
      {Object.entries(byCategory).map(([category, sum]) => (
        <p key={category}>{category}: ${formatNumber(sum)}</p>
      ))}
    </div>
  );
};

export default ExpenseSummary;
