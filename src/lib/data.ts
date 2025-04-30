// Mock product data
export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  price: number;
  stock: number;
  images: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  variants: ProductVariant[];
  rating: number;
  featured: boolean;
}

export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Beauty & Personal Care",
  "Sports & Outdoors"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation technology and 20+ hours of battery life. Perfect for music lovers and professionals on the go.",
    category: "Electronics",
    variants: [
      {
        id: "1-1",
        color: "Black",
        price: 199.99,
        stock: 25,
        images: ["/placeholder.svg"]
      },
      {
        id: "1-2",
        color: "White",
        price: 199.99,
        stock: 15,
        images: ["/placeholder.svg"]
      },
      {
        id: "1-3",
        color: "Blue",
        price: 219.99,
        stock: 10,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.8,
    featured: true
  },
  {
    id: "2",
    name: "Ultra HD Smart TV - 55\"",
    description: "Crystal-clear 4K display with smart features and streaming capabilities. Connect to all your favorite services with this sleek, modern television.",
    category: "Electronics",
    variants: [
      {
        id: "2-1",
        size: "55\"",
        price: 699.99,
        stock: 12,
        images: ["/placeholder.svg"]
      },
      {
        id: "2-2",
        size: "65\"",
        price: 999.99,
        stock: 8,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.5,
    featured: true
  },
  {
    id: "3",
    name: "Designer Cotton T-Shirt",
    description: "Comfortable, breathable cotton t-shirt with modern design. Perfect for casual everyday wear.",
    category: "Clothing",
    variants: [
      {
        id: "3-1",
        size: "S",
        color: "Black",
        price: 29.99,
        stock: 50,
        images: ["/placeholder.svg"]
      },
      {
        id: "3-2",
        size: "M",
        color: "Black",
        price: 29.99,
        stock: 45,
        images: ["/placeholder.svg"]
      },
      {
        id: "3-3",
        size: "L",
        color: "Black",
        price: 29.99,
        stock: 30,
        images: ["/placeholder.svg"]
      },
      {
        id: "3-4",
        size: "M",
        color: "White",
        price: 29.99,
        stock: 20,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.3,
    featured: false
  },
  {
    id: "4",
    name: "Professional Chef's Knife",
    description: "High-carbon stainless steel chef's knife with ergonomic handle. Essential tool for any kitchen enthusiast or professional.",
    category: "Home & Kitchen",
    variants: [
      {
        id: "4-1",
        price: 89.99,
        stock: 35,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.9,
    featured: true
  },
  {
    id: "5",
    name: "Bestselling Novel - The Hidden Path",
    description: "Award-winning fiction novel that takes readers on an unforgettable journey of mystery and self-discovery.",
    category: "Books",
    variants: [
      {
        id: "5-1",
        price: 24.99,
        stock: 100,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.7,
    featured: false
  },
  {
    id: "6",
    name: "Premium Skincare Set",
    description: "Complete skincare routine with cleanser, toner, moisturizer, and serum. Made with all-natural ingredients.",
    category: "Beauty & Personal Care",
    variants: [
      {
        id: "6-1",
        price: 79.99,
        stock: 40,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.6,
    featured: false
  },
  {
    id: "7",
    name: "Lightweight Running Shoes",
    description: "Ultra-lightweight running shoes with responsive cushioning and breathable mesh design. Perfect for athletes and casual runners alike.",
    category: "Sports & Outdoors",
    variants: [
      {
        id: "7-1",
        size: "9",
        color: "Gray/Red",
        price: 119.99,
        stock: 28,
        images: ["/placeholder.svg"]
      },
      {
        id: "7-2",
        size: "10",
        color: "Gray/Red",
        price: 119.99,
        stock: 25,
        images: ["/placeholder.svg"]
      },
      {
        id: "7-3",
        size: "11",
        color: "Gray/Red",
        price: 119.99,
        stock: 20,
        images: ["/placeholder.svg"]
      },
      {
        id: "7-4",
        size: "10",
        color: "Black/Blue",
        price: 119.99,
        stock: 15,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.4,
    featured: true
  },
  {
    id: "8",
    name: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, sleep, and more with this advanced fitness tracker. Water-resistant and with 7-day battery life.",
    category: "Electronics",
    variants: [
      {
        id: "8-1",
        color: "Black",
        price: 149.99,
        stock: 30,
        images: ["/placeholder.svg"]
      },
      {
        id: "8-2",
        color: "Silver",
        price: 149.99,
        stock: 25,
        images: ["/placeholder.svg"]
      }
    ],
    rating: 4.2,
    featured: false
  }
];

export const getProductByID = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export function getAllProducts(): Product[] {
  // This should return all products from your data source
  // For now, we'll combine all category products
  let allProducts: Product[] = [];
  
  categories.forEach(category => {
    if (category !== "All") {
      const categoryProducts = getProductsByCategory(category);
      allProducts = [...allProducts, ...categoryProducts];
    }
  });
  
  // Remove duplicates (in case products appear in multiple categories)
  const uniqueProducts = allProducts.filter((product, index, self) => 
    index === self.findIndex((p) => p.id === product.id)
  );
  
  return uniqueProducts;
}
