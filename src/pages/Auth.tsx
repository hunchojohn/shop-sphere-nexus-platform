
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';

export default function Auth() {
  const { isAuthenticated, login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const isLogin = (event.currentTarget.dataset.action === 'login');

    try {
      const success = isLogin 
        ? await login(email, password)
        : await register('', email, password);

      if (success) {
        toast({
          title: isLogin ? "Welcome back!" : "Account created",
          description: isLogin ? "You've been logged in successfully." : "Your account has been created successfully.",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: isLogin ? "Invalid credentials" : "Could not create account",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="container mx-auto max-w-md py-12 px-4 flex-1 flex items-center">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100 animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-stockx-green">Welcome to ShopSphere</h1>
              <p className="text-gray-500">Enter your credentials to continue</p>
            </div>

            <div className="space-y-4">
              <form onSubmit={handleSubmit} data-action="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    className="focus-visible:ring-stockx-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                    className="focus-visible:ring-stockx-green"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-stockx-green hover:bg-stockx-green/90 transition-all"
                >
                  Log in
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} data-action="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    name="email" 
                    type="email" 
                    required 
                    className="focus-visible:ring-stockx-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    name="password" 
                    type="password" 
                    required 
                    className="focus-visible:ring-stockx-green"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="outline" 
                  className="w-full border-stockx-green text-stockx-green hover:bg-stockx-green hover:text-white transition-colors"
                >
                  Create Account
                </Button>
              </form>
              
              <div className="text-center text-sm">
                <Link to="/" className="text-stockx-green hover:underline">
                  Return to home page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
