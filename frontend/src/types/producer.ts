export interface Producer {
  image_url_has_name?: boolean;
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
  category?: string;
  direct_sales_last_year?: number;
  indirect_sales_last_year?: number;
  direct_sales_last_month?: number;
  indirect_sales_last_month?: number;
  last_sale_value?: number;
  direct_skyrocketing_sales?: boolean;
  indirect_skyrocketing_sales?: boolean;
}
