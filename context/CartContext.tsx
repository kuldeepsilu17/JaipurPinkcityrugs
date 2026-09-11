'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, ProductVariant, CartItem, Coupon } from '@/types';
import { INITIAL_COUPONS } from '@/data/coupons';
import { formatINR } from '@/lib/currency';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedVariant?: ProductVariant,
    selectedColor?: string,
    quantity?: number,
    customNotes?: string,
    openDrawer?: boolean
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  freeShippingThreshold: number;
  total: number;
  itemCount: number;
  shippingMethod: 'standard' | 'express_dhl';
  setShippingMethod: (method: 'standard' | 'express_dhl') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_INR = 9999;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express_dhl'>('standard');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem('jpr_cart_version');
      if (storedVersion === '2.0.0_inr') {
        const savedCart = localStorage.getItem('jpr_cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        const savedCoupon = localStorage.getItem('jpr_applied_coupon');
        if (savedCoupon) {
          setAppliedCoupon(JSON.parse(savedCoupon));
        }
      } else {
        localStorage.setItem('jpr_cart_version', '2.0.0_inr');
        localStorage.removeItem('jpr_cart');
        localStorage.removeItem('jpr_applied_coupon');
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('jpr_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (appliedCoupon) {
        localStorage.setItem('jpr_applied_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('jpr_applied_coupon');
      }
    }
  }, [appliedCoupon, isInitialized]);

  const addToCart = (
    product: Product,
    selectedVariant?: ProductVariant,
    selectedColor?: string,
    quantity: number = 1,
    customNotes?: string,
    openDrawer: boolean = true
  ) => {
    const variant = selectedVariant || product.variants[0] || {
      id: `default-${product.id}`,
      size: product.sizes[0] || 'Standard',
      price: product.price,
      sku: product.sku,
      stock: product.stock,
    };

    const color = selectedColor || product.colors[0] || 'Default';
    const itemId = `${product.id}-${variant.id}-${color}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            product,
            selectedVariant: variant,
            selectedColor: color,
            quantity,
            customNotes,
          },
        ];
      }
    });

    toast.success(`Added "${product.name}" (${variant.size}) to cart!`, {
      description: 'Handcrafted in Jaipur • Ready for worldwide dispatch',
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    toast.info('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = INITIAL_COUPONS.find(
      (c) => c.code.toUpperCase() === cleanCode && c.isActive
    );

    if (!coupon) {
      toast.error('Invalid coupon code. Try WELCOME10 for 10% off!');
      return false;
    }

    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      toast.error(`Coupon requires a minimum order of ${formatINR(coupon.minOrderAmount)}`);
      return false;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon "${coupon.code}" applied successfully!`, {
      description: coupon.description,
    });
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.selectedVariant.price || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal <= 0) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
    if (appliedCoupon.discountType === 'fixed') {
      return Math.min(appliedCoupon.discountValue, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const shipping = useMemo(() => {
    if (subtotal <= 0) return 0;
    if (subtotal >= FREE_SHIPPING_THRESHOLD_INR) return 0;
    return shippingMethod === 'express_dhl' ? 999 : 499;
  }, [subtotal, shippingMethod]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount + shipping);
  }, [subtotal, discount, shipping]);

  const itemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD_INR,
        total,
        itemCount,
        shippingMethod,
        setShippingMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
