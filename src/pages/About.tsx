
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Trophy, 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  Building, 
  HeartHandshake, 
  Lightbulb,
  MapPin
} from 'lucide-react';

const team = [
  {
    name: 'Rajiv Mehta',
    role: 'Founder & CEO',
    bio: 'Former investment banker with 15+ years of experience in financial markets. MBA from IIM Ahmedabad.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    name: 'Priya Singh',
    role: 'Chief Content Officer',
    bio: 'Financial writer and educator with expertise in simplifying complex financial concepts for everyday readers.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    name: 'Amar Patel',
    role: 'Head of Product',
    bio: 'Product management expert with a passion for creating intuitive financial tools and calculators.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80'
  },
  {
    name: 'Sunita Kapoor',
    role: 'Chief Financial Analyst',
    bio: 'CFA with 12+ years of experience in equity research and investment analysis across various sectors.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80'
  }
];

const values = [
  {
    title: 'Accessibility',
    description: 'Making financial knowledge accessible to everyone, regardless of their background or expertise.',
    icon: <Users className="h-8 w-8 text-finance-green" />
  },
  {
    title: 'Accuracy',
    description: 'Providing thoroughly researched, verified information that you can rely on for your financial decisions.',
    icon: <CheckCircle2 className="h-8 w-8 text-finance-green" />
  },
  {
    title: 'Education',
    description: 'Focusing on explaining the "why" behind financial concepts, not just the "what" and "how".',
    icon: <GraduationCap className="h-8 w-8 text-finance-green" />
  },
  {
    title: 'Independence',
    description: 'Offering unbiased advice free from conflicts of interest and hidden agendas.',
    icon: <Shield className="h-8 w-8 text-finance-green" />
  },
  {
    title: 'Innovation',
    description: 'Continually improving our tools and content to better serve your financial learning needs.',
    icon: <Lightbulb className="h-8 w-8 text-finance-green" />
  },
  {
    title: 'Community',
    description: 'Building a supportive environment where people can learn and grow their financial knowledge together.',
    icon: <HeartHandshake className="h-8 w-8 text-finance-green" />
  }
];

const milestones = [
  {
    year: 2018,
    title: 'Founded in Mumbai',
    description: 'DigitSage was launched with a mission to democratize financial education for all Indians.'
  },
  {
    year: 2019,
    title: 'First 100,000 Users',
    description: 'Reached our first major milestone of 100,000 registered users on the platform.'
  },
  {
    year: 2020,
    title: 'Launched Mobile App',
    description: 'Expanded our reach with dedicated mobile applications for Android and iOS.'
  },
  {
    year: 2021,
    title: 'Financial Literacy Award',
    description: 'Recognized with the National Financial Literacy Excellence Award for our educational content.'
  },
  {
    year: 2022,
    title: 'Expanded Calculator Suite',
    description: 'Launched comprehensive financial calculator suite with 25+ specialized calculators.'
  },
  {
    year: 2023,
    title: 'Reached 1 Million Users',
    description: 'Celebrated reaching one million registered users across India.'
  }
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-finance-green py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DigitSage</h1>
            <p className="text-xl opacity-90 mb-8">
              Empowering financial literacy through accessible education and tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-finance-green hover:bg-white/90">Our Mission</Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">Meet the Team</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container py-16">
        <Tabs defaultValue="mission" className="mb-12">
          <TabsList className="mb-8 w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="mission">Our Mission</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="journey">Our Journey</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mission" className="space-y-12">
            {/* Mission Statement */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg mb-4">
                  At DigitSage, we believe that financial literacy is a fundamental life skill that everyone deserves access to, regardless of their background or education.
                </p>
                <p className="mb-4">
                  Our mission is to democratize financial knowledge by breaking down complex concepts into simple, actionable advice that empowers individuals to make informed financial decisions with confidence.
                </p>
                <p>
                  Through our comprehensive resources, intuitive calculators, and jargon-free content, we're building a future where financial understanding is accessible to all, not just a privileged few.
                </p>
              </div>
              <div className="bg-finance-cream rounded-xl p-8 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-finance-green/5 rounded-xl"></div>
                <div className="relative">
                  <Trophy className="h-12 w-12 text-finance-green mb-4" />
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="mb-6">
                    A financially literate India where everyone has the knowledge and tools to achieve financial independence and security.
                  </p>
                  <Separator className="mb-6" />
                  <h3 className="text-xl font-bold mb-3">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-finance-green">1M+</div>
                      <div className="text-sm">Monthly Visitors</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-finance-green">10K+</div>
                      <div className="text-sm">Financial Queries Answered</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-finance-green">500+</div>
                      <div className="text-sm">In-depth Articles</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-finance-green">25+</div>
                      <div className="text-sm">Financial Calculators</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Core Values */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="bg-white hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {value.icon}
                        <CardTitle>{value.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">{value.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-12">
            {/* Leadership Team */}
            <section>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-lg max-w-3xl mx-auto">
                  Our diverse team of financial experts, educators, and technologists is united by a passion for financial literacy and education.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="font-medium text-finance-green">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-lg mb-6">
                  Behind our leadership team is a dedicated group of writers, researchers, developers, and customer support specialists who make DigitSage's mission possible.
                </p>
                <Button variant="outline">Join Our Team</Button>
              </div>
            </section>
            
            {/* Company Culture */}
            <section className="bg-finance-green/5 p-8 rounded-xl">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Our Culture</h3>
                <p className="mb-6">
                  At DigitSage, we foster a learning-focused environment where curiosity, innovation, and impact drive everything we do. We believe that by creating a supportive workplace that values diversity of thought and experience, we can better serve our diverse user base.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-bold mb-2">What We Value</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Continuous learning and growth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Transparency and integrity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>User-centered thinking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Diversity and inclusion</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-bold mb-2">Benefits of Working Here</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Flexible work arrangements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Learning & development allowance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Collaborative, supportive environment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-finance-green flex-shrink-0" />
                        <span>Meaningful work with real impact</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="journey" className="space-y-12">
            {/* Company History */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
              
              <div className="relative border-l-2 border-finance-green pl-8 space-y-12 ml-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[42px] flex items-center justify-center w-10 h-10 rounded-full bg-finance-green text-white">
                      {milestone.year.toString().substring(2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{milestone.year}: {milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="relative">
                  <div className="absolute -left-[42px] flex items-center justify-center w-10 h-10 rounded-full bg-finance-gold text-white">
                    Now
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Today & Beyond</h3>
                    <p className="text-muted-foreground mb-4">
                      DigitSage continues to grow and evolve, always focused on our core mission of making financial literacy accessible to everyone.
                    </p>
                    <p className="text-muted-foreground">
                      We're expanding our educational content, developing new interactive tools, and building community features to help users learn from each other.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Testimonials */}
            <section className="bg-finance-cream p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-8 text-center">What Our Users Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        AS
                      </div>
                      <div>
                        <CardTitle className="text-base">Ankit Sharma</CardTitle>
                        <CardDescription>Software Engineer</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">
                      "DigitSage helped me understand mutual funds and start investing. The calculators made it easy to see how my money could grow over time."
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                        RK
                      </div>
                      <div>
                        <CardTitle className="text-base">Ritu Kumar</CardTitle>
                        <CardDescription>Small Business Owner</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">
                      "The business finance articles helped me make sense of my company's finances and plan for growth. I reference them constantly!"
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                        VT
                      </div>
                      <div>
                        <CardTitle className="text-base">Vijay Thakur</CardTitle>
                        <CardDescription>College Student</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-muted-foreground">
                      "As a student, I never thought I could start investing. DigitSage showed me how to begin with just ₹500 monthly and build for my future."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* Contact/Office Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                <p className="mb-6">
                  We'd love to hear from you! Whether you have a question, feedback, or want to explore collaboration opportunities, our team is here to help.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-finance-green mt-0.5" />
                    <div>
                      <h4 className="font-medium">Headquarters</h4>
                      <p className="text-muted-foreground">
                        DigitSage Financial Technologies<br />
                        Level 8, Lotus Corporate Park<br />
                        Goregaon East, Mumbai 400063
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-finance-green" />
                    <div>
                      <h4 className="font-medium">Regional Office</h4>
                      <p className="text-muted-foreground">
                        91 Springboard, Koramangala<br />
                        Bengaluru 560034
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="mr-4">Contact Us</Button>
                  <Button variant="outline">Careers</Button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-80 bg-slate-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.6433238767!2d72.74109998592372!3d19.08250300425264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650451033257!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default About;
