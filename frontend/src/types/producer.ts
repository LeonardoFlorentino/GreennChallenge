export interface Producer {
  id: number;
  name: string;
  email: string;
  document: string;
  status: "active" | "inactive";
  commission: number;
  imageUrl: string;
  createdAt: string;

  followers_instagram: number;
  relevance_score: number;
  is_trending: boolean;
}
