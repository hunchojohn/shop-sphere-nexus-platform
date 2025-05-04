
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CollectionHighlights = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Collection Highlights</h2>
          <Link to="/products">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              View All Collections
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="/images/collection1.png" 
                alt="New Arrivals" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-bold mb-2 text-white">New Arrivals</h3>
                  <p className="text-white/80 mb-4">Check out the latest additions to our collection.</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-4 bg-white dark:bg-gray-800">
              <Link to="/products">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Explore</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="/images/collection2.png" 
                alt="Best Sellers" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-bold mb-2 text-white">Best Sellers</h3>
                  <p className="text-white/80 mb-4">Our most popular products that customers love.</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-4 bg-white dark:bg-gray-800">
              <Link to="/products">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Shop Now</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="/images/collection3.png" 
                alt="Limited Editions" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-bold mb-2 text-white">Limited Editions</h3>
                  <p className="text-white/80 mb-4">Exclusive items available for a limited time only.</p>
                </div>
              </div>
            </div>
            <div className="p-6 pt-4 bg-white dark:bg-gray-800">
              <Link to="/products">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Collection</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionHighlights;
