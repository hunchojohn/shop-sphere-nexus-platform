
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(email, password);
  };

  const fillAdminCredentials = () => {
    setEmail("admin@example.com");
    setPassword("admin123");
  };

  return (
    <form onSubmit={handleSubmit} data-action="login" className="space-y-4">
      {error && (
        <Alert variant="destructive" className="text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="focus-visible:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
}
