'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://newsdata.io/api/1/news?apikey=pub_446a8f5e1f8ccf6f1e9e3e4f5a6b7c8d9e0f1a2b3c4d5e6f&language=en&image=1'
        );
        const data = await response.json();
        
        if (data.results) {
          setNews(data.results.slice(0, 6).map((article: any) => ({
            title: article.title,
            description: article.description || 'No description available',
            url: article.link,
            source: article.source_id,
            image: article.image_url || 'https://via.placeholder.com/400x200?text=No+Image',
          })));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Show demo articles on error
        setNews([
          {
            title: 'Latest Technology News',
            description: 'Stay updated with the latest technology trends',
            url: '#',
            source: 'Tech Daily',
            image: 'https://via.placeholder.com/400x200?text=Technology',
          },
          {
            title: 'World News Update',
            description: 'Important news from around the world',
            url: '#',
            source: 'World News',
            image: 'https://via.placeholder.com/400x200?text=World+News',
          },
          {
            title: 'Business & Finance',
            description: 'Latest business and market updates',
            url: '#',
            source: 'Business Today',
            image: 'https://via.placeholder.com/400x200?text=Business',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">News</h1>
        <p className="text-muted-foreground mb-8">Stay updated with the latest news</p>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-muted-foreground">Loading news...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer">
                <Card className="bg-card border-primary/30 overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all h-full flex flex-col cursor-pointer">
                  <div className="w-full h-40 bg-secondary overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-muted-foreground mb-2">{article.source}</p>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-1 line-clamp-2 mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <ExternalLink className="w-4 h-4" />
                      Read more
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
