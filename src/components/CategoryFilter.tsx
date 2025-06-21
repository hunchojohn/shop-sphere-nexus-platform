
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Categories</h3>
      <ScrollArea className="w-full">
        <div className="flex flex-nowrap space-x-3 pb-3 pr-4 md:flex-col md:space-x-0 md:space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap md:justify-start transition-all duration-200 ${
                activeCategory === category
                  ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600 shadow-md"
                  : "bg-white hover:bg-orange-50 text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-700"
              }`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
