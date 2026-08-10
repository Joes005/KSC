import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Calendar, ArrowRight, Bell } from 'lucide-react';

export function Updates() {
  const updates = [
    {
      id: 1,
      category: 'Admission Updates',
      title: 'Admissions Open for AY 2026-27',
      date: 'Latest Update',
      content: 'Admissions are now open for all UG and PG programmes under Tamil Nadu Open University and Bharathidasan University for the academic year 2026-27.'
    },
    {
      id: 2,
      category: 'Course Updates',
      title: 'New Vocational Diploma Programmes',
      date: 'Latest Update',
      content: 'We have added several new vocational diploma programmes including Logistics and Supply Chain Management and Fashion Designing.'
    },
    {
      id: 3,
      category: 'Important Notices',
      title: 'Study Materials Distribution',
      date: 'Latest Update',
      content: 'Study materials for the current semester are available at the centre. Please contact us to arrange collection.'
    }
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">News & Updates</h1>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest announcements, admission updates, and important notices.
          </p>
        </div>

        <div className="space-y-6">
          {updates.map((update) => (
            <Card key={update.id} className="hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3 flex flex-row justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md mb-3 inline-block uppercase tracking-wider">
                    {update.category}
                  </span>
                  <CardTitle className="text-xl leading-tight">{update.title}</CardTitle>
                </div>
                <div className="hidden sm:flex items-center text-muted-foreground text-sm bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                  <Calendar size={14} className="mr-2" />
                  {update.date}
                </div>
              </CardHeader>
              <CardContent>
                <div className="sm:hidden flex items-center text-muted-foreground text-sm mb-3">
                  <Calendar size={14} className="mr-2" />
                  {update.date}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {update.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
