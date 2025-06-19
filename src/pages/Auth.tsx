
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthToggle from '@/components/auth/AuthToggle';

export default function Auth() {
  const { isAuthenticated, login, register, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect admins to the admin dashboard, regular users to homepage
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, isAdmin]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      console.log(`Attempting to login with email: ${email}`);
      
      const result = await login(email, password);

      if (result.success) {
        toast({
          variant: "success",
          title: "Welcome back!",
          description: "You've been logged in successfully.",
        });
        
        // Redirect happens in the useEffect above based on isAdmin status
      } else {
        setLoginError(result.message || "Invalid email or password");
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setLoginError("An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      console.log(`Attempting to register with email: ${email}`);
      
      const result = await register(name, email, password);

      if (result.success) {
        toast({
          variant: "success",
          title: "Account created",
          description: "Your account has been created successfully.",
        });
        navigate('/');
      } else {
        setLoginError(result.message || "Could not create account");
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Could not create account",
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setLoginError("An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign In" 
      description="Sign in to your BeiPoaHub account to access your profile, orders, and more."
    >
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-orange-600">Welcome to BeiPoaHub</h1>
          <p className="text-gray-500">Enter your credentials to continue</p>
        </div>

        <AuthToggle isLoginMode={isLoginMode} onToggle={setIsLoginMode} />

        {isLoginMode ? (
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={isLoading} 
            error={loginError} 
          />
        ) : (
          <RegisterForm 
            onSubmit={handleRegister} 
            isLoading={isLoading} 
            error={loginError} 
          />
        )}
          
        <div className="text-center text-sm">
          <Link to="/" className="text-orange-600 hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
