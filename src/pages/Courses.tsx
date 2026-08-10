import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { UNIVERSITIES } from '../data/universities';
import { CourseCard } from '../components/common/CourseCard';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Search } from 'lucide-react';

export function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State from URL or default
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedUniv, setSelectedUniv] = useState(searchParams.get('university') || 'all');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');
  const [selectedMedium, setSelectedMedium] = useState(searchParams.get('medium') || 'all');

  // Update URL when filters change
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    updateFilters('search', e.target.value);
  };

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniv = selectedUniv === 'all' || course.universityId === selectedUniv;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesMedium = selectedMedium === 'all' || course.medium.includes(selectedMedium);
      
      return matchesSearch && matchesUniv && matchesLevel && matchesMedium;
    });
  }, [searchTerm, selectedUniv, selectedLevel, selectedMedium]);

  // Extract unique mediums and levels for filters
  const uniqueMediums = Array.from(new Set(COURSES.map(c => c.medium).flatMap(m => m.split(', ')).flatMap(m => m.split('/')).map(m => m.trim()))).filter(Boolean);
  const uniqueLevels = Array.from(new Set(COURSES.map(c => c.level)));

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">Find the Right Programme</h1>
          <p className="text-muted-foreground text-lg">
            Search and filter through our comprehensive list of university courses to find the perfect fit for your future.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search course name..." 
                className="pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <Select 
              value={selectedUniv} 
              onChange={(e) => {
                setSelectedUniv(e.target.value);
                updateFilters('university', e.target.value);
              }}
            >
              <option value="all">All Universities</option>
              {UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </Select>

            <Select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                updateFilters('level', e.target.value);
              }}
            >
              <option value="all">All Levels</option>
              {uniqueLevels.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </Select>

            <Select
              value={selectedMedium}
              onChange={(e) => {
                setSelectedMedium(e.target.value);
                updateFilters('medium', e.target.value);
              }}
            >
              <option value="all">All Mediums</option>
              {uniqueMediums.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'programme' : 'programmes'}
          </h2>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border">
            <p className="text-muted-foreground text-lg mb-4">No programmes found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedUniv('all');
                setSelectedLevel('all');
                setSelectedMedium('all');
                setSearchParams({});
              }}
              className="text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
