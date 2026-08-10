import React from 'react';
import { SITE_CONFIG } from '../data/config';
import { Card, CardContent } from '../components/ui/Card';
import { CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-ksc-dark text-center">About {SITE_CONFIG.name}</h1>
        
        <div className="space-y-12">
          {/* Main About */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4">Welcome to {SITE_CONFIG.shortName}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {SITE_CONFIG.name} is a dedicated study centre in Karur, committed to providing comprehensive guidance and support for students pursuing distance and online education programmes from recognized universities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We bridge the gap between universities and students by offering a local point of contact for admission processes, course information, and academic support throughout their educational journey.
            </p>
          </section>

          {/* Our Approach */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Approach & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Academic Support", desc: "Guidance on selecting the right programme based on your career goals and eligibility." },
                { title: "Student Support", desc: "Assistance with application forms, fee payments, and university communications." },
                { title: "Learning Resources", desc: "Access to study materials and reference books for your enrolled programmes." },
                { title: "Exam Assistance", desc: "Timely updates regarding exam schedules, hall tickets, and result announcements." }
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <CheckCircle2 className="text-primary mt-1 mr-3 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Physical Center Proof (Placeholder for image) */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border text-center">
            <h2 className="text-2xl font-semibold mb-6">Visit Our Centre</h2>
            <p className="text-muted-foreground mb-8">
              We welcome students to visit our physical centre in Karur for in-person counseling and support.
            </p>
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden relative group">
              <span className="text-muted-foreground font-medium z-10">Physical Centre Photograph</span>
              {/* Optional: Add actual image path here later */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
