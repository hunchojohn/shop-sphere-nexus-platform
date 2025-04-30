
import React from 'react';
import { Package, Edit, Trash2 } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';

type Product = Database['public']['Tables']['products']['Row'];

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-stockx-light-gray">
          <TableHead className="font-bold">Product</TableHead>
          <TableHead className="font-bold">Category</TableHead>
          <TableHead className="font-bold">Price</TableHead>
          <TableHead className="font-bold">Stock</TableHead>
          <TableHead className="font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="border-b hover:bg-gray-50">
            <TableCell>
              <div className="flex items-center gap-3">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="h-12 w-12 object-cover border border-gray-200" 
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-100 flex items-center justify-center border border-gray-200">
                    <Package className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm">{product.category}</TableCell>
            <TableCell className="text-sm font-medium">{formatCurrency(Number(product.price))}</TableCell>
            <TableCell className="text-sm">{product.stock}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(product)}
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(product.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductList;
