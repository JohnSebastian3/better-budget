export interface CategoryInterface {
  title: string;
  subcategories: {
    title: string;
    budget: number;
    dateMonth: number;
    dateYear: number;
  }[],
  dateMonth: number;
  dateYear: number;
}