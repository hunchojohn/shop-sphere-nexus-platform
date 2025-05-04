
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Helmet } from 'react-helmet';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Auth() {
  const { isAuthenticated, login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const isLogin = (event.currentTarget.dataset.action === 'login');

    try {
      // Log the login attempt details for debugging
      console.log(`Attempting to ${isLogin ? 'login' : 'register'} with email: ${email}`);
      
      const success = isLogin 
        ? await login(email, password)
        : await register(formData.get('name') as string || '', email, password);

      if (success) {
        toast({
          variant: "success",
          title: isLogin ? "Welcome back!" : "Account created",
          description: isLogin ? "You've been logged in successfully." : "Your account has been created successfully.",
        });
        navigate('/');
      } else {
        setLoginError(isLogin ? "Invalid email or password" : "Could not create account");
        toast({
          variant: "destructive",
          title: "Error",
          description: isLogin ? "Invalid credentials" : "Could not create account",
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

  const fillAdminCredentials = () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (emailInput && passwordInput) {
      emailInput.value = "admin@example.com";
      passwordInput.value = "admin123";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>PapiKicks - Sign In</title>
        <meta name="description" content="Sign in to your PapiKicks account to access your profile, orders, and more." />
      </Helmet>
      <Navbar />
      <div className="container mx-auto max-w-md py-12 px-4 flex-1 flex items-center">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100 animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-blue-600">Welcome to PapiKicks</h1>
              <p className="text-gray-500">Enter your credentials to continue</p>
            </div>

            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${isLoginMode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLoginMode(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${!isLoginMode ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                >
                  Register
                </button>
              </div>
            </div>

            {loginError && (
              <Alert variant="destructive" className="text-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            {isLoginMode ? (
              <form onSubmit={handleSubmit} data-action="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center">
                  <button 
                    type="button"
                    onClick={fillAdminCredentials}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Use admin credentials
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    (Admin: admin@example.com / Password: admin123)
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} data-action="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input 
                    id="register-name" 
                    name="name" 
                    type="text" 
                    required 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    name="email" 
                    type="email" 
                    required 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    name="password" 
                    type="password" 
                    required 
                    className="focus-visible:ring-blue-600"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            )}
              
            <div className="text-center text-sm">
              <Link to="/" className="text-blue-600 hover:underline">
                Return to home page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
