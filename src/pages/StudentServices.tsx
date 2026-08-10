import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { BookOpen, GraduationCap, ClipboardList, HelpCircle, FileText, Bell } from 'lucide-react';

export function StudentServices() {
  const services = [
    { icon: GraduationCap, title: "Admission Guidance", desc: "Expert counseling to help you choose the right university and programme for your career goals." },
    { icon: BookOpen, title: "Course Information", desc: "Detailed information about course structure, syllabus, and academic requirements." },
    { icon: FileText, title: "Study Material Assistance", desc: "Help with acquiring and managing university study materials and reference books." },
    { icon: ClipboardList, title: "Assignment Guidance", desc: "Information on assignment submission dates, formats, and university guidelines." },
    { icon: HelpCircle, title: "Examination Support", desc: "Guidance on exam application processes and preparation strategies." },
    { icon: Bell, title: "Academic Updates", desc: "Timely notifications regarding hall tickets, exam schedules, and result declarations." }
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">Student Services</h1>
          <p className="text-lg text-muted-foreground">
            We are dedicated to supporting our students throughout their academic journey with a comprehensive range of services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-ksc-light rounded-lg flex items-center justify-center text-primary mb-4">
                  <service.icon size={24} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
