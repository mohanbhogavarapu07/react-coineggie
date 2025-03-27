
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Brain, ChartBar, PiggyBank, FileText, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const agents = [
  {
    title: "Financial Planning Advisor",
    description: "Get personalized advice on budgeting, saving, and achieving your financial goals.",
    icon: <PiggyBank className="h-10 w-10 text-finance-green" />,
    skills: ["Budget Analysis", "Goal Setting", "Savings Strategies"]
  },
  {
    title: "Investment Consultant",
    description: "Analyze investment opportunities and receive portfolio recommendations based on your risk profile.",
    icon: <ChartBar className="h-10 w-10 text-finance-green" />,
    skills: ["Market Analysis", "Risk Assessment", "Portfolio Diversification"]
  },
  {
    title: "Tax Planning Expert",
    description: "Navigate tax regulations and discover strategies to optimize your tax situation.",
    icon: <FileText className="h-10 w-10 text-finance-green" />,
    skills: ["Tax Law Insights", "Deduction Finder", "Filing Guidance"]
  },
  {
    title: "Retirement Planning Specialist",
    description: "Plan your ideal retirement with personalized strategies for long-term financial security.",
    icon: <Shield className="h-10 w-10 text-finance-green" />,
    skills: ["401(k) Optimization", "Social Security Planning", "Retirement Calculators"]
  }
];

const AIAgents = () => {
  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-finance-charcoal to-finance-charcoal/90 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Financial Guidance</h1>
            <p className="text-xl text-white/80 mb-8">
              Get personalized financial advice from our specialized AI agents, available 24/7 to help you make informed decisions.
            </p>
            <Button size="lg" className="bg-finance-green hover:bg-finance-green/90 text-white">
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finance-charcoal mb-4">Meet Our Financial AI Agents</h2>
            <p className="text-lg text-finance-charcoal/70 max-w-2xl mx-auto">
              Our specialized AI agents combine financial expertise with advanced machine learning to provide you with accurate, personalized guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map((agent, index) => (
              <Card key={index} className="border-2 hover:border-finance-green transition-all duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                  {agent.icon}
                  <div>
                    <CardTitle>{agent.title}</CardTitle>
                    <CardDescription className="mt-1.5">{agent.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-finance-charcoal text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="text-finance-green hover:text-finance-green/90 p-0 flex items-center gap-2">
                    Chat with Agent <ArrowRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-finance-charcoal mb-6">How Our AI Agents Work</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-finance-green text-white flex items-center justify-center flex-shrink-0 mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-lg">Select Your Financial Topic</h3>
                    <p className="text-finance-charcoal/70">Choose the financial area where you need guidance from our specialized agents.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-finance-green text-white flex items-center justify-center flex-shrink-0 mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-lg">Share Your Situation</h3>
                    <p className="text-finance-charcoal/70">The agent will ask relevant questions to understand your specific financial circumstances.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-finance-green text-white flex items-center justify-center flex-shrink-0 mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-lg">Receive Personalized Advice</h3>
                    <p className="text-finance-charcoal/70">Get actionable recommendations tailored to your unique financial goals and situation.</p>
                  </div>
                </li>
              </ul>
              <Button className="mt-8 bg-finance-green hover:bg-finance-green/90 text-white">
                Try It Now
              </Button>
            </div>
            
            <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-md">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Brain className="h-8 w-8 text-finance-green" />
                <div>
                  <h3 className="font-semibold">Financial Planning Advisor</h3>
                  <p className="text-sm text-finance-charcoal/70">Online • Ready to help</p>
                </div>
              </div>
              
              <div className="py-6 space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Hello! I'm your Financial Planning Assistant. What financial goal would you like to work on today?</p>
                </div>
                
                <div className="bg-finance-green/10 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-sm">I want to save for a down payment on a house in the next 3 years.</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Great goal! To help you plan effectively, could you share your target down payment amount and your current monthly savings capacity?</p>
                </div>
              </div>
              
              <div className="pt-4 border-t flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
                <Button size="sm" className="bg-finance-green">
                  <MessageSquare size={16} className="mr-1" /> Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AIAgents;
