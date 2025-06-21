
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
  resetPassword: (email: string) => Promise<{success: boolean, message: string}>;
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

  // Track user activity when they login
  const trackUserActivity = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_activity')
        .upsert({
          user_id: userId,
          last_login: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
      
      if (error) {
        console.error('Error tracking user activity:', error);
      }
    } catch (error) {
      console.error('Error tracking user activity:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Track user activity on sign in
        if (event === 'SIGNED_IN' && currentSession?.user) {
          setTimeout(() => {
            trackUserActivity(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Track activity for existing sessions
      if (currentSession?.user) {
        setTimeout(() => {
          trackUserActivity(currentSession.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
    try {
      console.log(`Attempting to login with email: ${email}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
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
      const metadata = {
        first_name: name,
        role: email === 'admin@example.com' ? 'admin' : 'customer'
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/`
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

  const resetPassword = async (email: string): Promise<{success: boolean, message: string}> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`
      });
      
      if (error) {
        console.error("Password reset error:", error.message);
        return { success: false, message: error.message };
      }
      
      // Send email notification using the direct Supabase URL
      try {
        await fetch(`https://qiirroanuepnmpqdvibs.supabase.co/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpaXJyb2FudWVwbm1wcWR2aWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzQ0MjMsImV4cCI6MjA2MTQxMDQyM30.2YGph6FZ8hsyGfTKsH4kH3ZGLw5h5FwVKNBojyA6pdM`,
          },
          body: JSON.stringify({
            type: 'password_reset',
            email: email,
            resetLink: `${window.location.origin}/auth?mode=reset`,
          }),
        });
      } catch (emailError) {
        console.error('Error sending password reset email:', emailError);
      }
      
      return { success: true, message: "Password reset email sent successfully" };
    } catch (error: any) {
      console.error("Password reset error:", error?.message || error);
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
    resetPassword,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
