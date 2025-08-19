import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out successfully.' });
    setIsOpen(false); // Close mobile menu on logout
  };

  const baseNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Classes', path: '/classes' },
    { name: 'Membership', path: '/membership' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const navItems = isAuthenticated
    ? [...baseNavItems, { name: 'Admin', path: '/admin' }]
    : baseNavItems;

  return (
    <>
      {/* Desktop Navbar - Fixed Top */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/1d521332-978d-44e0-8cca-06863b74306a.png" 
                alt="Bharat Barbell Club" 
                className="h-12 w-auto"
              />
              <div className="text-xl font-bold text-primary">
                Bharat Barbell Club
              </div>
            </NavLink>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {isAuthenticated && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  Admin
                </NavLink>
              )}
              
              <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/join-now">
                      <Button className="btn-hero">
                        Join Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Fixed Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Dumbbell className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </NavLink>
          ))}
          
          {/* More Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/1d521332-978d-44e0-8cca-06863b74306a.png" 
                  alt="Bharat Barbell Club" 
                  className="h-10 w-auto"
                />
                <span className="font-bold text-lg text-primary">Menu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 px-6 py-8 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 px-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-muted'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="p-6 space-y-3 border-t border-border">
              {isAuthenticated ? (
                <Button variant="outline" className="w-full" size="lg" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" className="block" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full" size="lg">
                      Login
                    </Button>
                  </Link>
                  <Link to="/join-now" className="block" onClick={() => setIsOpen(false)}>
                    <Button className="btn-hero w-full" size="lg">
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;