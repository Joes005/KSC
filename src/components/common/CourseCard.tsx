import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: {
    id: string;
    universityId: string;
    name: string;
    level: string;
    duration: string;
    medium: string;
    eligibility: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'ug': return 'default';
      case 'pg': return 'secondary';
      case 'diploma': return 'outline';
      case 'certificate': return 'gold';
      default: return 'default';
    }
  };

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={getLevelColor(course.level) as any}>{course.level}</Badge>
          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md capitalize">
            {course.universityId.replace('-', ' ')}
          </span>
        </div>
        <CardTitle className="text-xl line-clamp-2 leading-tight" title={course.name}>
          {course.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center text-muted-foreground">
          <Clock size={16} className="mr-2 shrink-0 text-primary/70" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <BookOpen size={16} className="mr-2 shrink-0 text-primary/70" />
          <span>Medium: {course.medium}</span>
        </div>
        {course.eligibility && (
          <div className="flex items-start text-muted-foreground">
            <CheckCircle2 size={16} className="mr-2 shrink-0 mt-0.5 text-primary/70" />
            <span className="line-clamp-2" title={course.eligibility}>{course.eligibility}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Button variant="outline" className="w-full sm:w-1/2" asChild>
          <Link to={`/courses/${course.id}`}>Details</Link>
        </Button>
        <Button className="w-full sm:w-1/2" asChild>
          <Link to={`/admissions?course=${course.id}`}>Apply</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
