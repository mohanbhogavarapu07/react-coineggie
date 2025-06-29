import React from 'react';
import Logo from '@/components/ui/logo';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const categories = [
  {
    title: "Personal Finance",
    description: "Learn about budgeting, saving, and investing for your personal needs",
    href: "/categories/personal-finance",
  },
  {
    title: "Investments",
    description: "Explore investment strategies, stocks, bonds, and portfolio management",
    href: "/categories/investments",
  },
  {
    title: "Retirement",
    description: "Plan for your future with retirement accounts, pension plans, and more",
    href: "/categories/retirement",
  },
  {
    title: "Business",
    description: "Discover business finance, funding options, and entrepreneurial advice",
    href: "/categories/business",
  },
  {
    title: "Taxes",
    description: "Understand tax planning, deductions, credits, and filing strategies",
    href: "/categories/taxes",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-[100vw]">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <Logo
              size="md"
              variant="default"
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto font-medium">Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/calculators" className="font-medium text-sm transition-colors hover:text-primary px-3 py-2">
                  Calculators
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/knowledge-base" className="font-medium text-sm transition-colors hover:text-primary px-3 py-2">
                  Knowledge Base
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/ai-agents" className="font-medium text-sm transition-colors hover:text-primary px-3 py-2">
                  AI Agents
                </Link>
              </NavigationMenuItem>
              <NavigationMenu>
              <Link to="/blog" className="font-medium text-sm transition-colors hover:text-primary px-3 py-2">
                  Blog
                </Link>
                </NavigationMenu>
              <NavigationMenuItem>
                <Link to="/about" className="font-medium text-sm transition-colors hover:text-primary px-3 py-2">
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Link to="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:hidden py-4 border-t">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <nav className="grid gap-4">
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              <ul className="grid gap-2 pl-4">
                {categories.map((category) => (
                  <li key={category.href}>
                    <Link
                      to={category.href}
                      className="text-sm transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-border" />
            <Link
              to="/calculators"
              className="text-sm transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculators
            </Link>
            <Link
              to="/knowledge-base"
              className="text-sm transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Knowledge Base
            </Link>
            <Link
              to="/ai-agents"
              className="text-sm transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Agents
            </Link>
            <Link 
              to="/blog" 
              className="text-sm transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-sm transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <hr className="border-t border-border" />
            <Link
              to="/sign-in"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full">Sign In</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}