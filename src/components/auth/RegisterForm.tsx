
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} data-action="register" className="space-y-4">
      {error && (
        <Alert variant="destructive" className="text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="register-name">Full Name</Label>
        <Input 
          id="register-name" 
          name="name" 
          type="text" 
          required 
          className="focus-visible:ring-blue-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
  );
}
