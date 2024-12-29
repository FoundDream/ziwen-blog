import { articles } from '@/articles';
import ArticleCard from '@/components/ArticleCard';

const Blog = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <div className="space-y-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
