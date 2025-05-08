
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface QuestionsSectionProps {
  questions: Question[];
  title?: string;
  className?: string;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({ questions, title = "Generated Questions", className = "" }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>
                <div className="bg-accent/30 p-4 rounded-md mt-2">
                  <p>{item.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default QuestionsSection;
