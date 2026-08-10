import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Image as ImageIcon } from 'lucide-react';

export function Gallery() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Centre', 'Study Materials', 'Events'];
  
  // Placeholders since images are to be configured later
  const images = [
    { id: 1, category: 'Centre', title: 'KSC Exterior', src: 'placeholder-centre' },
    { id: 2, category: 'Study Materials', title: 'Library Books', src: 'placeholder-books' },
    { id: 3, category: 'Study Materials', title: 'Course Materials', src: 'placeholder-materials' },
  ];
  
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">Our Gallery</h1>
          <p className="text-lg text-muted-foreground">
            A glimpse into the KARUR STUDY CENTER environment and resources.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-white text-muted-foreground hover:bg-gray-100 border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map(img => (
            <Card key={img.id} className="overflow-hidden group cursor-pointer border-none shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] bg-muted relative flex items-center justify-center">
                <ImageIcon className="text-muted-foreground/30 absolute z-0" size={48} />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors z-10 flex items-end p-4">
                  <span className="text-white font-medium bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    {img.title}
                  </span>
                </div>
                <span className="z-10 font-medium text-muted-foreground">Image Placeholder</span>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No images found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
