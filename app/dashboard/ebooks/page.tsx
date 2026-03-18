'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Download } from 'lucide-react';

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    rating: 4.8,
    reviews: 2543,
    category: 'Fiction',
    cover: 'https://via.placeholder.com/200x300?text=The+Great+Gatsby',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    rating: 4.9,
    reviews: 3421,
    category: 'Classic',
    cover: 'https://via.placeholder.com/200x300?text=To+Kill+a+Mockingbird',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    rating: 4.7,
    reviews: 1893,
    category: 'Dystopian',
    cover: 'https://via.placeholder.com/200x300?text=1984',
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    rating: 4.9,
    reviews: 2156,
    category: 'Romance',
    cover: 'https://via.placeholder.com/200x300?text=Pride+and+Prejudice',
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    rating: 4.5,
    reviews: 1632,
    category: 'Fiction',
    cover: 'https://via.placeholder.com/200x300?text=Catcher+in+the+Rye',
  },
  {
    id: 6,
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    rating: 4.6,
    reviews: 987,
    category: 'Gothic',
    cover: 'https://via.placeholder.com/200x300?text=Wuthering+Heights',
  },
];

export default function EBooksPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">E-Books Library</h1>
          <p className="text-muted-foreground">Access thousands of books from our collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className="bg-card border-primary/30 overflow-hidden hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <div className="relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {book.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{book.rating}</span>
                  <span className="text-xs text-muted-foreground">({book.reviews} reviews)</span>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Read Book
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
