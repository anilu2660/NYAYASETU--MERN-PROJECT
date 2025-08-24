"use client";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/Components/Components/button";
import { Card } from "@/Components/Components/card";
import { User, Mail, Calendar, LogOut, Shield, FileText, Scale, Settings, Bell, Activity } from "lucide-react";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting to signin
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/30 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-4">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-primary">Secure Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Welcome to</span>
              <br />
              <span className="text-foreground">Nyayasetu</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your comprehensive legal services dashboard for accessing justice, tracking cases, and managing legal affairs.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Enhanced Profile Card */}
            <div className="xl:col-span-1">
              <Card className="glass-card p-8 text-center animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary via-primary-light to-secondary rounded-full mx-auto flex items-center justify-center relative overflow-hidden">
                    <User className="w-12 h-12 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-80 animate-gradient"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center justify-center text-muted-foreground">
                        <Shield className="w-4 h-4 mr-2 text-primary" />
                        <span className="text-sm">ID: {user.id.slice(-8)}</span>
                      </div>
                      <div className="flex items-center justify-center text-green-600">
                        <Activity className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Active User</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      className="w-full mb-3 hover:bg-secondary/50 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced Services Section */}
            <div className="xl:col-span-3">
              <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <h3 className="text-3xl font-bold text-foreground mb-2">Legal Services Dashboard</h3>
                <p className="text-muted-foreground">Access all your legal services and track your progress</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="glass-card p-6 text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">0</h4>
                  <p className="text-muted-foreground text-sm">Active Cases</p>
                </Card>
                <Card className="glass-card p-6 text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Scale className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">0</h4>
                  <p className="text-muted-foreground text-sm">Completed Filings</p>
                </Card>
                <Card className="glass-card p-6 text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">0</h4>
                  <p className="text-muted-foreground text-sm">Notifications</p>
                </Card>
              </div>

              {/* Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card p-8 group hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <Scale className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Case Tracking</h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Monitor your legal cases, court dates, and case status updates in real-time.
                    </p>
                    <Button onClick={() => router.push("/casetrack")} className="w-full group-hover:shadow-lg transition-shadow">
                      Access Cases
                    </Button>
                  </div>
                </Card>

                <Card className="glass-card p-8 group hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">E-Filing</h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Electronically file legal documents with digital signatures and instant processing.
                    </p>
                    <Button onClick={() => router.push("/efile")} className="w-full group-hover:shadow-lg transition-shadow">
                      File Documents
                    </Button>
                  </div>
                </Card>

                <Card className="glass-card p-8 group hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Legal Aid</h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Connect with qualified legal professionals and access free legal assistance programs.
                    </p>
                    <Button onClick={() => router.push("/legalaid")} className="w-full group-hover:shadow-lg transition-shadow">
                      Get Legal Aid
                    </Button>
                  </div>
                </Card>

                <Card className="glass-card p-8 group hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-in-up" style={{animationDelay: '0.9s'}}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Legal Resources</h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Access legal forms, guidelines, court procedures, and comprehensive legal information.
                    </p>
                    <Button onClick={() => router.push("/resource")} className="w-full group-hover:shadow-lg transition-shadow">
                      Browse Resources
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
