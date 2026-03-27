import { useState, useEffect } from 'react';
import type { Product } from '../types';

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(products));
  }, [products]);

  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      quantity,
    };
    setProducts([...products, newProduct]);
  };

  const updateQuantity = (id: number, amount: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + amount) } : p
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return { products, addProduct, updateQuantity, deleteProduct };
};