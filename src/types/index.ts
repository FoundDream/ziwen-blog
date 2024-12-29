export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface ArticlePreview {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
  tags?: string[];
}

export interface ArticleDetail extends ArticlePreview {
  content: string;
  updatedAt: string;
}
