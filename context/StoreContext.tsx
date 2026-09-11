'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, CustomRugQuote, Review, Coupon, OrderStatus } from '@/types';
import { PRODUCTS } from '@/data/products';
import { INITIAL_ORDERS, INITIAL_QUOTES } from '@/data/initialOrders';
import { INITIAL_REVIEWS } from '@/data/reviews';
import { INITIAL_COUPONS } from '@/data/coupons';
import { toast } from 'sonner';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customQuotes: CustomRugQuote[];
  reviews: Review[];
  coupons: Coupon[];
  
  // Product Operations
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  
  // Order Operations
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingEvents'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, carrier?: string, trackingNumber?: string) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrderByTrackingOrEmail: (orderId: string, emailOrPhone: string) => Order | undefined;
  
  // Review Operations
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => Review;
  getProductReviews: (productId: string) => Review[];
  
  // Custom Quote Operations
  submitCustomQuote: (quoteData: Omit<CustomRugQuote, 'id' | 'createdAt' | 'status'>) => CustomRugQuote;
  updateQuoteStatus: (quoteId: string, status: CustomRugQuote['status']) => void;
  
  // Coupon Operations
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => Coupon;
  toggleCouponActive: (couponId: string) => void;
  deleteCoupon: (couponId: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORE_DATA_VERSION = '2.0.0_inr';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customQuotes, setCustomQuotes] = useState<CustomRugQuote[]>(INITIAL_QUOTES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from LocalStorage if available and matching current version
  useEffect(() => {
    try {
      const storedVersion = localStorage.getItem('jpr_store_version');
      if (storedVersion === STORE_DATA_VERSION) {
        const savedProducts = localStorage.getItem('jpr_store_products');
        if (savedProducts) setProducts(JSON.parse(savedProducts));

        const savedOrders = localStorage.getItem('jpr_store_orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders));

        const savedQuotes = localStorage.getItem('jpr_store_quotes');
        if (savedQuotes) setCustomQuotes(JSON.parse(savedQuotes));

        const savedReviews = localStorage.getItem('jpr_store_reviews');
        if (savedReviews) setReviews(JSON.parse(savedReviews));

        const savedCoupons = localStorage.getItem('jpr_store_coupons');
        if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
      } else {
        // Upgrade cache to new INR data version
        localStorage.setItem('jpr_store_version', STORE_DATA_VERSION);
        localStorage.setItem('jpr_store_products', JSON.stringify(PRODUCTS));
        localStorage.setItem('jpr_store_orders', JSON.stringify(INITIAL_ORDERS));
        localStorage.setItem('jpr_store_quotes', JSON.stringify(INITIAL_QUOTES));
        localStorage.setItem('jpr_store_reviews', JSON.stringify(INITIAL_REVIEWS));
        localStorage.setItem('jpr_store_coupons', JSON.stringify(INITIAL_COUPONS));
      }
    } catch (e) {
      console.error('Failed to load store data from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('jpr_store_version', STORE_DATA_VERSION);
      localStorage.setItem('jpr_store_products', JSON.stringify(products));
      localStorage.setItem('jpr_store_orders', JSON.stringify(orders));
      localStorage.setItem('jpr_store_quotes', JSON.stringify(customQuotes));
      localStorage.setItem('jpr_store_reviews', JSON.stringify(reviews));
      localStorage.setItem('jpr_store_coupons', JSON.stringify(coupons));
    }
  }, [products, orders, customQuotes, reviews, coupons, isInitialized]);

  // Product CRUD
  const addProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
    toast.success(`Product "${newProduct.name}" created successfully!`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    );
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.info('Product removed from catalog');
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  // Order Operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingEvents'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `JPR-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
      trackingEvents: [
        {
          timestamp: new Date().toISOString(),
          status: 'Order Placed',
          location: 'Jaipur Head Studio, Rajasthan, India',
          description: 'Order confirmed and verified. Preparing artisan loom batch.',
        },
      ],
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    carrier?: string,
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const newEvent = {
          timestamp: new Date().toISOString(),
          status,
          location: status === 'Shipped' ? 'Jaipur Air Express Facility' : 'Jaipur Artisan Hub',
          description: `Status updated to ${status}.${carrier ? ` Handed over to ${carrier}.` : ''}`,
        };
        return {
          ...order,
          orderStatus: status,
          carrier: carrier || order.carrier,
          trackingNumber: trackingNumber || order.trackingNumber,
          trackingEvents: [...order.trackingEvents, newEvent],
        };
      })
    );
    toast.success(`Order ${orderId} updated to ${status}`);
  };

  const getOrderById = (id: string) => {
    const cleanId = id.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === cleanId);
  };

  const getOrderByTrackingOrEmail = (orderId: string, emailOrPhone: string) => {
    const cleanId = orderId.trim().toUpperCase();
    const cleanContact = emailOrPhone.trim().toLowerCase();
    return orders.find((o) => {
      const matchId = o.id.toUpperCase() === cleanId || (o.trackingNumber && o.trackingNumber.toUpperCase() === cleanId);
      const matchContact =
        !cleanContact ||
        o.customer.email.toLowerCase().includes(cleanContact) ||
        o.customer.phone.toLowerCase().includes(cleanContact);
      return matchId && matchContact;
    });
  };

  // Review Operations
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>): Review => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpfulCount: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
    toast.success('Thank you! Your verified review has been published.');
    return newReview;
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  // Custom Quote Operations
  const submitCustomQuote = (quoteData: Omit<CustomRugQuote, 'id' | 'createdAt' | 'status'>): CustomRugQuote => {
    const quoteNum = Math.floor(100 + Math.random() * 900);
    const newQuote: CustomRugQuote = {
      ...quoteData,
      id: `QUOTE-2026-${quoteNum}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setCustomQuotes((prev) => [newQuote, ...prev]);
    toast.success(`Custom Rug Request #${newQuote.id} received!`, {
      description: 'Our Jaipur master weaver will review your specs and contact you within 24 hours.',
    });
    return newQuote;
  };

  const updateQuoteStatus = (quoteId: string, status: CustomRugQuote['status']) => {
    setCustomQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status } : q))
    );
    toast.success(`Quote #${quoteId} marked as ${status}`);
  };

  // Coupon Operations
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>): Coupon => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    toast.success(`Coupon code ${newCoupon.code} created!`);
    return newCoupon;
  };

  const toggleCouponActive = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
    toast.info('Coupon deleted');
  };

  const resetToDefaults = () => {
    setProducts(PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomQuotes(INITIAL_QUOTES);
    setReviews(INITIAL_REVIEWS);
    setCoupons(INITIAL_COUPONS);
    localStorage.removeItem('jpr_store_products');
    localStorage.removeItem('jpr_store_orders');
    localStorage.removeItem('jpr_store_quotes');
    localStorage.removeItem('jpr_store_reviews');
    localStorage.removeItem('jpr_store_coupons');
    toast.info('Store data reset to default catalog');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        customQuotes,
        reviews,
        coupons,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByTrackingOrEmail,
        addReview,
        getProductReviews,
        submitCustomQuote,
        updateQuoteStatus,
        addCoupon,
        toggleCouponActive,
        deleteCoupon,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
