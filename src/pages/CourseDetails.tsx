import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { UNIVERSITIES } from '../data/universities';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SITE_CONFIG } from '../data/config';
import { ArrowLeft, CheckCircle2, Clock, BookOpen, GraduationCap, Building } from 'lucide-react';

export function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'admission'>('overview');

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button asChild><Link to="/courses">Back to Courses</Link></Button>
      </div>
    );
  }

  const university = UNIVERSITIES.find(u => u.id === course.universityId);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/courses" className="inline-flex items-center text-primary hover:underline mb-6 font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to all programmes
        </Link>

        {/* Header Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{course.level}</Badge>
            <Badge variant="outline">{university?.name}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ksc-dark mb-6">{course.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 pt-6 border-t">
            <div className="flex items-start space-x-3">
              <Building className="text-ksc-gold shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">University</p>
                <p className="font-semibold text-sm">{university?.shortName}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="text-ksc-gold shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">Duration</p>
                <p className="font-semibold text-sm">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BookOpen className="text-ksc-gold shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">Medium</p>
                <p className="font-semibold text-sm">{course.medium}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <GraduationCap className="text-ksc-gold shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase">Level</p>
                <p className="font-semibold text-sm">{course.level}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to={`/admissions?course=${course.id}`}>Enquire Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=I am interested in the ${course.name} programme.`} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b mb-8 overflow-x-auto pb-px">
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Eligibility
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'admission' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
            onClick={() => setActiveTab('admission')}
          >
            Admission Information
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckCircle2 className="mr-2 text-primary" size={20} />
                  Eligibility Criteria
                </h3>
                {course.eligibility ? (
                  <p className="text-muted-foreground leading-relaxed pl-7 border-l-2 border-primary/20 ml-2 py-1">
                    {course.eligibility}
                  </p>
                ) : (
                  <p className="text-muted-foreground pl-7">Please contact the centre for detailed eligibility criteria.</p>
                )}
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Course Structure</h3>
                <p className="text-muted-foreground">
                  Detailed semester-wise structure and syllabus information is available upon enquiry. Please contact us to get the full prospectus for {course.name}.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'admission' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold mb-4">Admission Process</h3>
              <ul className="space-y-4 text-muted-foreground list-decimal list-inside pl-2">
                <li>Submit your basic enquiry through our website or WhatsApp.</li>
                <li>Our academic counselor will contact you to verify your eligibility.</li>
                <li>Submit the required documents (Mark sheets, ID proof, Photos).</li>
                <li>Complete the admission formalities and fee payment at our centre.</li>
                <li>Receive your enrollment confirmation and study materials.</li>
              </ul>
              
              <div className="mt-8 p-6 bg-ksc-light rounded-xl border border-primary/10">
                <h4 className="font-semibold text-lg mb-2">Need Fee Details?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Fee structures vary based on the university and academic year. Contact our centre for the current fee details for this programme.
                </p>
                <Button variant="gold" size="sm" asChild>
                  <Link to="/contact">Contact Centre</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
