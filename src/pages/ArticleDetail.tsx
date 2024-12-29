import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { articles, getArticleContent } from '@/articles';
import NotFound from './NotFound';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string | null>(null);
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    const loadContent = async () => {
      if (id) {
        const content = await getArticleContent(id);
        setContent(content);
      }
    };

    loadContent();
  }, [id]);

  if (!article) {
    return <NotFound />;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <time>发布于: {article.date}</time>
        </div>
        <div className="flex gap-2 mt-4">
          {article.tags?.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {content && (
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    style={atomDark as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </article>
  );
};

export default ArticleDetail;
