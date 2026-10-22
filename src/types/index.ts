export interface Product {
  id: string;
  slug: string;
  name: string;
  genericName: string;
  brand: string;
  manufacturer: string;
  category: string;
  strength: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment' | 'Drops' | 'Powder' | 'Device';
  packSize: string;
  rating: number;
  ratingCount: number;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  inStock: boolean;
  stockCount: number;
  prescriptionRequired: boolean;
  images: string[];
  description: string;
  overview: string;
  uses: string[];
  directions: string;
  ingredients: string[];
  warnings: string[];
  precautions: string[];
  sideEffects: string[];
  storage: string;
  batchNumber?: string;
  expiryDate?: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  itemCount: number;
  iconName: string;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  prescriptionUploaded?: boolean;
}

export interface Prescription {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
  patientName: string;
  doctorName?: string;
  status: 'Uploaded' | 'Under Review' | 'Approved' | 'Rejected' | 'Requires Clarification';
  notes?: string;
  pharmacistNotes?: string;
  associatedOrderId?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Pharmacist Approved'
  | 'Preparing Order'
  | 'Packed'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  timestamp: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    genericName: string;
    price: number;
    mrp: number;
    quantity: number;
    image: string;
    prescriptionRequired: boolean;
  }[];
  shippingAddress: Address;
  deliveryMethod: {
    id: 'standard' | 'express' | 'hospital_pickup';
    title: string;
    estimatedDays: string;
    price: number;
  };
  paymentMethod: {
    type: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Wallet' | 'Cash on Delivery';
    transactionId?: string;
    status: 'Success' | 'Processing' | 'Failed';
  };
  pricing: {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    couponCode?: string;
  };
  currentStatus: OrderStatus;
  timeline: OrderTimelineStep[];
  prescriptionId?: string;
  isPrescriptionVerified?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  image: string;
  availableToday: boolean;
  availableSlots: string[];
  about: string;
  hospitalRoom: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  badge: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'prescription' | 'stock' | 'offer' | 'system';
  link?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'pharmacist' | 'admin';
  avatar?: string;
  joinedDate: string;
}
