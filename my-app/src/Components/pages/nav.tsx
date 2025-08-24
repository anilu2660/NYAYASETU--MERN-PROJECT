"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Next.js hook instead of useLocation
import { Scale, Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

const Navbar = () => {
  const pathname = usePathname(); // Replaces useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Home", protected: false },
    { path: "/services", label: "Services", protected: true },
    { path: "/casetrack", label: "Case Tracking", protected: true },
    { path: "/legalaid", label: "Legal Aid", protected: true },
    { path: "/efile", label: "eFiling", protected: true },
    { path: "/resource", label: "Resources", protected: true },
    { path: "/contact", label: "Contact", protected: true },
  ];

  const handleProfileClick = () => {
    if (!user) {
      // Redirect to signin if not authenticated
      window.location.href = '/signin';
    }
  };

  const handleNavClick = (e: React.MouseEvent, item: { path: string; label: string; protected: boolean }) => {
    if (item.protected && !user) {
      e.preventDefault();
      window.location.href = '/signin';
    }
  };

  return (
    <nav className="bg-card/90 backdrop-blur-lg border-b border-border/60 sticky top-0 z-50 shadow-sm hover:shadow-md transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/3 before:to-accent/3 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-primary to-primary-light rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Scale className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">NyayaSetu</h1>
              <p className="text-xs text-muted-foreground">Department of Justice</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-8">
            {/* Main Navigation Links - Centered */}
            <div className="flex items-center space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`nav-link ${
                    pathname === item.path ? "text-primary after:w-full" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Authentication Section - Right Side */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl bg-secondary/30 hover:bg-secondary/70 transition-all duration-300 group border border-border/30 hover:border-primary/20 shadow-sm hover:shadow-md"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5 overflow-hidden">
                  <Sun className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 transform ${
                    theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`} />
                  <Moon className={`absolute inset-0 w-5 h-5 text-slate-600 dark:text-slate-300 transition-all duration-500 transform ${
                    theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`} />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div ref={profileMenuRef} className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 p-2">
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/signin"
                    className={`nav-link ${
                      pathname === "/signin" ? "text-primary after:w-full" : ""
                    }`}
                  >
                    Sign In
                  </Link>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.path
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary"
                  }`}
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
              <div className="flex justify-center border-t border-border pt-3 mt-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 border border-border/30"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <Moon className="w-4 h-4 text-slate-300" />
                      <span className="text-sm font-medium">Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium">Light Mode</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Mobile Authentication Section */}
              <div className="border-t border-border pt-3 mt-3">
                {user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        pathname === "/profile"
                          ? "text-primary bg-secondary"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/signin"
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        pathname === "/signin"
                          ? "text-primary bg-secondary"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <button
                      onClick={() => {
                        handleProfileClick();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
     
    </nav>
  );
};

export default Navbar;
