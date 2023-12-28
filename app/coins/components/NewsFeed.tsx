import React, { useState, useEffect } from 'react';
import { Card, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import styled from 'styled-components';

interface Article {
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
}

interface Props {
  coinId: string;
}

const API_KEY = "873b8c2b-0b7f-4527-a088-89cf8fb341d8";

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const NewsFeed: React.FC<Props> = ({ coinId }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://content.guardianapis.com/search?q=${coinId}&api-key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch news articles');
        const data = await response.json();

        setArticles(data.response.results.slice(0, 10));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [coinId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <NewsGrid>
      {articles.map((article, index) => (
        <Card key={index}>
          <CardHeader>{article.webTitle}</CardHeader>
          <CardContent>
            <CardDescription>Published: {new Date(article.webPublicationDate).toLocaleDateString()}</CardDescription>
            <a href={article.webUrl} target="_blank" rel="noopener noreferrer" style={{ color:'blue' }}>
              Read more...
            </a>
          </CardContent>
        </Card>
      ))}
    </NewsGrid>
  );
};

export default NewsFeed;
