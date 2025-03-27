
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const SignIn = () => {
  return (
    <MainLayout>
      <div className="container max-w-screen-md py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-finance-charcoal mb-4">Welcome back</h1>
            <p className="text-finance-charcoal/70 mb-8">
              Sign in to access your personalized financial insights, saved calculators, and more.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-finance-charcoal/70">
                <span className="h-8 w-8 rounded-full bg-green-50 text-finance-green flex items-center justify-center">1</span>
                <span>Access personalized financial dashboards</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-finance-charcoal/70">
                <span className="h-8 w-8 rounded-full bg-green-50 text-finance-green flex items-center justify-center">2</span>
                <span>Save your calculator results and progress</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-finance-charcoal/70">
                <span className="h-8 w-8 rounded-full bg-green-50 text-finance-green flex items-center justify-center">3</span>
                <span>Chat with AI financial advisors</span>
              </div>
            </div>
            
            <p className="text-sm text-finance-charcoal/70">
              New to DigitSage? <Link to="/sign-up" className="text-finance-green font-medium hover:underline">Create an account</Link>
            </p>
          </div>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  Continue with GitHub
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Link to="/forgot-password" className="text-xs text-finance-green hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-finance-charcoal/70">
                    Remember me for 30 days
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-finance-green hover:bg-finance-green/90">Sign in</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignIn;
