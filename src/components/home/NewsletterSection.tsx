
import React from "react";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="bg-blue-50 dark:bg-gray-800 py-16 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Join Our Newsletter</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to get updates on new products, special offers, and more.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 text-sm"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
