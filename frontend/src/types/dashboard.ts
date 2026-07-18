export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  time: string;
  type: 'sale' | 'arrival' | 'overdue' | 'quote';
}
