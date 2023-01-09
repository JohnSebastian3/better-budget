export interface TransactionInterface {
  title: string;
  category: string;
  subcategory: string;
  value: number;
  isIncome: boolean;
  dateDay: Number;
  dateMonth: Number;
  dateYear: Number;
  user: string;
}