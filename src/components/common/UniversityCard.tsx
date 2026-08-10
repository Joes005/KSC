import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { GraduationCap, Calendar } from 'lucide-react';

interface UniversityCardProps {
  university: {
    id: string;
    name: string;
    shortName: string;
    academicYear: string;
    description: string;
  };
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card className="flex flex-col h-full border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <GraduationCap className="text-ksc-gold" size={24} />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{university.shortName}</span>
        </div>
        <CardTitle className="text-xl leading-tight">{university.name}</CardTitle>
        <CardDescription className="flex items-center space-x-1 mt-2 text-primary font-medium">
          <Calendar size={14} />
          <span>Academic Year: {university.academicYear}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {university.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" asChild>
          <Link to={`/courses?university=${university.id}`}>View Programmes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
