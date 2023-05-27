import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getAllArticles();
      setArticles(response.data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Article List</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
