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
];

// 动态导入文章内容
export const getArticleContent = async (id: string) => {
  try {
    const content = await import(`./2024/${id}.md?raw`);
    return content.default;
  } catch (error) {
    console.error('Article not found:', id, error);
    return null;
  }
};
