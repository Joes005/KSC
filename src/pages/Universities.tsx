import React from 'react';
import { UNIVERSITIES } from '../data/universities';
import { UniversityCard } from '../components/common/UniversityCard';

export function Universities() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-ksc-dark">Universities</h1>
          <p className="text-lg text-muted-foreground">
            Explore the recognized universities we provide information and guidance for. Each institution offers a variety of programmes tailored to different academic and career aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UNIVERSITIES.map(univ => (
            <UniversityCard key={univ.id} university={univ} />
          ))}
        </div>
      </div>
    </div>
  );
}
