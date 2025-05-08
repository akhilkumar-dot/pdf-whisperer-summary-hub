import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isResultsPage = location.pathname === '/results';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToResultsTab = (tabName: string) => {
    // If we're already on results page, just update the tab
    if (isResultsPage) {
      const tabsElement = document.querySelector('[role="tablist"]');
      if (tabsElement) {
        const tabButton = tabsElement.querySelector(`[value="${tabName}"]`) as HTMLButtonElement;
        if (tabButton) {
          tabButton.click();
        }
      }
    } else {
      // Otherwise navigate to results page and store the tab to open
      sessionStorage.setItem('activeResultsTab', tabName);
      window.location.href = '/results';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <FileText className="h-6 w-6" />
          <span>PaperPicks</span>
        </Link>
        
        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList>
            {isResultsPage ? (
              <>
                <NavigationMenuItem>
                  <button 
                    onClick={() => navigateToResultsTab('summary')} 
                    className={navigationMenuTriggerStyle()}
                  >
                    Summary
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button 
                    onClick={() => navigateToResultsTab('questions')} 
                    className={navigationMenuTriggerStyle()}
                  >
                    Questions
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button 
                    onClick={() => navigateToResultsTab('resources')} 
                    className={navigationMenuTriggerStyle()}
                  >
                    Resources
                  </button>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <button onClick={() => scrollToSection('home')} className={navigationMenuTriggerStyle()}>
                    Home
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => scrollToSection('features')} className={navigationMenuTriggerStyle()}>
                    Features
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button onClick={() => scrollToSection('how-it-works')} className={navigationMenuTriggerStyle()}>
                    How It Works
                  </button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* CTA Button */}
        {!isResultsPage && (
          <Button size="sm" className="hidden sm:flex" onClick={() => scrollToSection('upload')}>
            Try Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
