export interface Notification {
  id: number;
  user_id: number;
  notify_id: number;
  title: string;
  content: string;
  image: string | null;
  implement_date: string;
  is_view: number;
}
