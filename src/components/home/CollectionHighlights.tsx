
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CollectionHighlights = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Collection Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-64 overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="New Arrivals" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 dark:text-white">New Arrivals</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Check out the latest additions to our catalog.</p>
              <Link to="/products">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">Explore</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-64 overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Best Sellers" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Best Sellers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Our most popular products that customers love.</p>
              <Link to="/products">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">Shop Now</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-64 overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Limited Editions" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Limited Editions</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Exclusive items available for a limited time only.</p>
              <Link to="/products">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">View Collection</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHighlights;
