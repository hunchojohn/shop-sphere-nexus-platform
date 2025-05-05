
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    // Show success toast
    toast({
      title: "Subscribed!",
      description: `${email} has been added to our newsletter.`,
      duration: 3000,
    });
    
    // Reset form
    form.reset();
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Newsletter section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div className="md:w-1/2">
            <h3 className="text-white text-xl font-semibold mb-4">PapiKicks</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Your destination for premium footwear with authentic products, competitive prices, and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <h4 className="text-white font-medium mb-4 text-lg">Join Our Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new arrivals, special offers, and exclusive discounts.
            </p>
            <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="whitespace-nowrap">
                <Mail className="h-4 w-4 mr-2" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Links and information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-800">
          <div>
            <h4 className="text-white font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white transition-colors">New Releases</Link></li>
              <li><Link to="/products?category=men" className="hover:text-white transition-colors">Men's</Link></li>
              <li><Link to="/products?category=women" className="hover:text-white transition-colors">Women's</Link></li>
              <li><Link to="/products?category=kids" className="hover:text-white transition-colors">Kids'</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/affiliates" className="hover:text-white transition-colors">Affiliates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="py-6 text-center text-gray-500 border-t border-gray-800">
          <p className="text-sm">© {new Date().getFullYear()} PapiKicks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
