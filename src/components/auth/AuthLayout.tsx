
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Helmet } from 'react-helmet';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>PapiKicks - {title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Navbar />
      <div className="container mx-auto max-w-md py-12 px-4 flex-1 flex items-center">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
