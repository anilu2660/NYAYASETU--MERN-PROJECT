"use client";
import React, { useState } from "react";
import { AuthForm } from "./AuthForm";

const Page = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const toggleAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="min-h-screen relative overflow-hidden touch-manipulation">
      {/* Mobile viewport optimization */}
      <div className="block md:hidden fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      </div>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 reveal-on-scroll reveal-up">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 justify-center lg:justify-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Nyayasetu
                  </h2>
                  <p className="text-sm text-muted-foreground/80">
                    Department of Justice
                  </p>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Digital Justice</span>
                <br />
                <span className="text-foreground">Portal</span>
              </h1>
              <p className="text-xl text-muted-foreground/80 max-w-lg">
                Access legal services, court records, and justice
                administration tools through our secure,
                government-authenticated platform.
              </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-card service-card tilt-on-hover shine-on-hover p-6 text-center reveal-on-scroll reveal-zoom">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center scale-hover">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground/70">
                  Government-grade security protecting your legal data
                </p>
              </div>

              <div className="glass-card service-card tilt-on-hover shine-on-hover p-6 text-center reveal-on-scroll reveal-zoom">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center scale-hover">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Legal Access
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Comprehensive access to court services and legal resources
                </p>
              </div>

              <div className="glass-card service-card tilt-on-hover shine-on-hover p-6 text-center reveal-on-scroll reveal-zoom">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center scale-hover">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Trusted</h3>
                <p className="text-sm text-muted-foreground/70">
                  Official government platform ensuring transparency and trust
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <AuthForm mode={authMode} onToggleMode={toggleAuthMode} />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none reveal-on-scroll reveal-fade"></div>
    </div>
  );
};

export default Page;
