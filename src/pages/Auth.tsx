
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

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
    <div className="container mx-auto max-w-md py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to ShopSphere</h1>
          <p className="text-gray-500">Enter your credentials to continue</p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} data-action="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Log in</Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} data-action="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input id="register-password" name="password" type="password" required />
            </div>
            <Button type="submit" variant="outline" className="w-full">Create Account</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
