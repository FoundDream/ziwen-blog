interface ArticleMetadata {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  createdAt: string;
}

// 文章元数据
export const articles: ArticleMetadata[] = [
  {
    id: 'hello',
    title: '欢迎来到我的博客',
    date: '2024-12-27',
    tags: ['Blog', 'React', 'TypeScript'],
    excerpt:
      '这是我的第一篇博客文章。在这里，我将会分享我的技术学习心得、开发经验和一些有趣的想法。',
    createdAt: '2024-12-27',
  },
  {
    id: 'tserror2307',
    title: '解决找不到模块"xx"或其相应的类型声明 ts(2307)',
    date: '2024-03-10',
    tags: ['monorepo', 'pnpm', 'TypeScript'],
    excerpt: '解决 ts 2307 问题',
    createdAt: '2025-03-10'
  }
];

// 动态导入文章内容
export const getArticleContent = async (id: string) => {
  try {
    const content = await import(`./blog/${id}.md?raw`);
    return content.default;
  } catch (error) {
    console.error('Article not found:', id, error);
    return null;
  }
};
