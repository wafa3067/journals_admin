export interface Article {
  id: number;
  title: string;
  subtitle: string;
  abstracts: string;
  createdAt: string;
  user: string; // assuming 'user' is the author
}

export interface SearchState {
  loading: boolean;
  articles: Article[];
  error: string | null;
}
