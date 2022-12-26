export interface TransactionInterface {
  title: string;
  category: string;
  subcategory: string;
  value: number;
  isIncome: boolean;
  date: Date;
  user: string;
}