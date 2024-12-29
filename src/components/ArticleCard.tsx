import { Link } from 'react-router-dom';
import { ArticlePreview } from '@/types';

interface ArticleCardProps {
  article: ArticlePreview;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link to={`/blog/${article.id}`}>
        <h2 className="text-xl font-semibold mb-2 hover:text-gray-600">{article.title}</h2>
      </Link>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {article.tags?.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <time className="text-sm text-gray-500">
          {new Date(article.createdAt).toLocaleDateString()}
        </time>
      </div>
    </article>
  );
};

export default ArticleCard;
