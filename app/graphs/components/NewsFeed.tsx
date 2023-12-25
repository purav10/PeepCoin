import React, { useState, useEffect } from 'react';
import { Card, CardDescription, CardHeader, CardContent } from '@/components/ui/card';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface Props {
  coinId: string;
}

const NewsFeed: React.FC<Props> = ({ coinId }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${coinId}&apiKey=6cf1ae7a05e54341819fded828c94dcc`);
        if (!response.ok) throw new Error('Failed to fetch news articles.');
        const data = await response.json();
        if (data.articles.length === 0) {
        articles.push({ title: 'No news available', description: '', url: '', urlToImage: '' });
        } else {
          setArticles(data.articles.slice(0, 3));
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [coinId]);

  if (loading) return(
    
    <Card style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }}>
        Loading...
    </Card>);
  if (error) return <div>{error}</div>;

  return (
    <Card style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }}>
      {articles.map((article, index) => (
        <Card key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', gap: "20px", padding: '20px',flex: 0.33 }}>
          <img src={article.urlToImage} alt="Article" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <CardHeader>{article.title}</CardHeader>
          <CardDescription>{article.description}</CardDescription>
          <CardContent>
            <a href={article.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>
              Read more
            </a>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
};

export default NewsFeed;
