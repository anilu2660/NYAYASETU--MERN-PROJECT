"use client";
import React, { useState } from "react";
import { Button } from "@/Components/Components/button";
import { Input } from "@/Components/Components/input";
import { Label } from "@/Components/Components/label";
import { Card } from "@/Components/Components/card";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";



interface AuthFormProps {
  mode: "signin" | "signup";
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const { signup, login, } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signin") {
        await login({
          email: formData.email,
          password: formData.password,
        });
        alert("Login success ✅");
      } else {
        // signup validation
        if (!formData.name.trim()) {
          setError("Please enter your full name");
          return;
        }
        if (!formData.email.trim()) {
          setError("Please enter your email address");
          return;
        }
        if (!formData.password.trim()) {
          setError("Please enter a password");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert("Signup success ✅! You have been logged in automatically.");
      }
    } catch (err: unknown) {
      console.error("Auth error:", err);
      let errorMessage = "Request failed";
      let errorCode = "UNKNOWN_ERROR";
      
      if (err && typeof err === 'object') {
        const error = err as { 
          response?: { 
            data?: { message?: string; code?: string }; 
            status?: number;
          }; 
          message?: string; 
          code?: string;
        };
        
        // Handle server response errors
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
          errorCode = error.response.data.code || "SERVER_ERROR";
        }
        // Handle network and connection errors
        else if (error.code === "NETWORK_OFFLINE" || !navigator.onLine) {
          errorMessage = "You're offline. Please check your internet connection.";
          errorCode = "NETWORK_OFFLINE";
        }
        else if (error.code === "TIMEOUT_ERROR") {
          errorMessage = "Request timed out. Please try again with a better connection.";
          errorCode = "TIMEOUT_ERROR";
        }
        else if (error.code === "NETWORK_ERROR" || error.code === "ERR_NETWORK") {
          errorMessage = "Cannot connect to server. Please check your internet connection.";
          errorCode = "NETWORK_ERROR";
        }
        else if (error.code === "CONNECTION_ERROR") {
          errorMessage = "Server is not responding. Please try again later.";
          errorCode = "CONNECTION_ERROR";
        }
        // Handle HTTP status codes
        else if (error.response?.status === 0) {
          errorMessage = "Cannot reach the server. Check your internet connection.";
          errorCode = "NO_CONNECTION";
        }
        else if (error.response?.status !== undefined && error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
          errorCode = "SERVER_ERROR";
        }
        else if (error.message) {
          errorMessage = error.message;
        }
      }
      
      // Add mobile-specific guidance for common errors
      if (/mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
        if (errorCode === "NETWORK_ERROR" || errorCode === "CONNECTION_ERROR") {
          errorMessage += " Try switching between WiFi and mobile data.";
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card auth-surface p-8 w-full max-w-md mx-auto border-white/10 backdrop-blur-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">
            {mode === "signin" ? "Secure Access" : "Register for Services"}
          </h1>
          <p className="text-muted-foreground/80">
            {mode === "signin"
              ? "Access your Nyayasetu account for legal services"
              : "Create your account to access justice department services"}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground/90 font-medium">
                Full Legal Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none z-10 absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full legal name as per documents"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="glass"
                  className="pl-11"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/90 font-medium">
              Official Email Address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none z-10 absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your official email address"
                value={formData.email}
                onChange={handleInputChange}
                variant="glass"
                className="pl-11"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground/90 font-medium">
              Secure Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none z-10 absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                variant="glass"
                className="pl-11 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground/90 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none z-10 absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  variant="glass"
                  className="pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}

{mode === "signin" && (
  <div className="flex justify-end">
    <button className="text-sm text-primary hover:text-primary-glow transition-colors"
    >
      Reset your password securely
    </button>
  </div>
          )}

          <Button
            type="submit"
            variant="glow"
            className="w-full h-12 text-base font-semibold"
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "signin" ? "Access Portal" : "Register for Services"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground/70">or use government SSO</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-3">
          <Button variant="glass" className="h-11">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
            </svg>
            Government SSO Login
          </Button>
        </div>

        {/* Toggle Mode */}
        <div className="text-center">
          <span className="text-muted-foreground/70">
            {mode === "signin" ? "New to Nyayasetu services?" : "Already registered with us?"}
          </span>
          <button
            onClick={onToggleMode}
            className="ml-2 text-primary hover:text-primary-glow transition-colors font-medium"
          >
            {mode === "signin" ? "Register here" : "Sign in here"}
          </button>
        </div>
      </div>
    </Card>
  );
};
