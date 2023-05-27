// components/ArticleDetails.js
import { useEffect, useState } from 'react';
import { getArticleById } from '../services/api';

const ArticleDetails = ({ match }) => {
  const [article, setArticle] = useState(null);
  const articleId = match.params.id;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(articleId);
        setArticle(article);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Article Details</h2>
      <p>Title: {article.title}</p>
      <p>Content: {article.content}</p>
      <p>Author: {article.author}</p>
    </div>
  );
};

export default ArticleDetails;
