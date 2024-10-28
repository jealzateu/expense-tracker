export interface Expense {
    id: number;
    amount: number;
    category: string;
    date: string;
    description?: string;
}

export interface ExpenseFormProps {
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
    editingExpense: Expense | null;
    setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

export interface ExpenseTableProps {
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
    setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}
