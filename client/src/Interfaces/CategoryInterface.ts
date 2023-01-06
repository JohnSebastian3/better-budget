export interface CategoryInterface {
  title: string;
  subcategories: {
    title: string;
    budget: number;
    date: Date
  }[],
  date: Date
}