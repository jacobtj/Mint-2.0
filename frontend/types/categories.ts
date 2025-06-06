export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense' | 'none';
}