import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Admissions() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');

  const steps = [
    { num: '01', title: 'Choose University', desc: 'Select the university that offers your desired programme.' },
    { num: '02', title: 'Choose Programme', desc: 'Browse our extensive list of UG, PG, Diploma, and Certificate courses.' },
    { num: '03', title: 'Check Eligibility', desc: 'Ensure you meet the academic requirements for your chosen programme.' },
    { num: '04', title: 'Submit Enquiry', desc: 'Contact us via the website or WhatsApp to express your interest.' },
    { num: '05', title: 'Complete Process', desc: 'Visit our centre to submit documents and complete the admission formalities.' },
    { num: '06', title: 'Academic Guidance', desc: 'Receive your study materials and ongoing support for your studies.' },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">Admission Process</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to higher education starts here. Follow our simple step-by-step process to secure your admission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative">
          {steps.map((step, index) => (
            <Card key={index} className="relative z-10 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8">
                <div className="text-5xl font-black text-ksc-gold/20 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to take the next step?</h2>
          <p className="text-muted-foreground mb-8">
            {courseId 
              ? "You have selected a course. Contact us now to verify your eligibility and begin the admission process."
              : "Contact our academic counselors today for personalized guidance on course selection and admission."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to={courseId ? `/contact?course=${courseId}` : "/contact"}>
                Submit Application Enquiry
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">Explore More Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
