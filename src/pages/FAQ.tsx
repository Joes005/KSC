import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export function FAQ() {
  const faqs = [
    {
      q: "What courses are available?",
      a: "We offer guidance for a wide range of Undergraduate (UG), Postgraduate (PG), Diploma, and Certificate programmes across various universities."
    },
    {
      q: "What is distance education?",
      a: "Distance education allows you to study without having to attend regular campus classes, offering flexibility for working professionals and students."
    },
    {
      q: "How do I choose a course?",
      a: "Our academic counselors are available to guide you based on your previous educational qualifications and future career goals."
    },
    {
      q: "What is the eligibility?",
      a: "Eligibility varies by course. Generally, UG requires a 10+2 pass, while PG requires a relevant undergraduate degree. Check specific course details for exact requirements."
    },
    {
      q: "Which universities have programmes listed?",
      a: "We provide information for programmes from Tamil Nadu Open University, Alagappa University, and Bharathidasan University."
    },
    {
      q: "How can I contact the study centre?",
      a: "You can reach us via WhatsApp, phone, email, or by visiting our physical centre in Karur. See our Contact page for details."
    },
    {
      q: "How can I get admission guidance?",
      a: "You can submit an enquiry form on our website or directly message us on WhatsApp to begin the admission guidance process."
    },
    {
      q: "How do I get course details?",
      a: "You can use our 'Courses' page to search and filter available programmes, or contact us directly for a full prospectus of your desired course."
    }
  ];

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-ksc-dark">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services and the admission process.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
