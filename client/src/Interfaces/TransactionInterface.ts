export interface TransactionInterface {
  title: string;
  category: string;
  value: number;
  isIncome: boolean;
  date: Date;
  user: string;
}