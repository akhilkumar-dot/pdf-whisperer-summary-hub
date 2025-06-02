
import React from 'react';
import FlowStep from './FlowStep';

const HowItWorks = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your documents into actionable insights in just two simple steps
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <FlowStep
            number={1}
            title="Upload Document"
            description="Upload your PDF document and let our AI analyze the content"
          />
          
          <FlowStep
            number={2}
            title="Get AI Summary"
            description="Receive a comprehensive AI-generated summary of your document's key insights"
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
