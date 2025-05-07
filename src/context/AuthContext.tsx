
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{success: boolean, message: string}>;
  register: (name: string, email: string, password: string) => Promise<{success: boolean, message: string}>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const isAuthenticated = !!user;
  
  // Consider a user admin if:
  // 1. They have the exact email 'admin@example.com' (hardcoded admin for testing)
  // 2. OR they have the 'admin' role in user_metadata
  const isAdmin = !!user && (
    user.email === 'admin@example.com' || 
    user.user_metadata?.role === 'admin'
  );

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
    try {
      // Log the attempt for debugging
      console.log(`Attempting to login with email: ${email}`);
      
      // CRITICAL FIX: For demo admin account, create a special case with direct access
      if (email === 'admin@example.com' && password === 'admin123') {
        console.log("Admin demo login detected");
        // Continue with the normal login process, but we've logged the special case
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        return { success: false, message: error.message };
      }
      
      console.log("Login successful:", data.user?.email);
      return { success: true, message: "Login successful" };
    } catch (error: any) {
      console.error("Login exception:", error?.message || error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{success: boolean, message: string}> => {
    try {
      // Add admin role if registering with admin@example.com
      const metadata = {
        first_name: name,
        role: email === 'admin@example.com' ? 'admin' : 'customer'
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) {
        console.error("Registration error:", error.message);
        return { success: false, message: error.message };
      }
      
      console.log("Registration successful:", data.user?.email);
      return { success: true, message: "Registration successful" };
    } catch (error: any) {
      console.error("Registration error:", error?.message || error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
