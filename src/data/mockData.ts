import { User, Address, Order, Prescription, NotificationItem } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-101',
  name: 'Prabhas Gorusu',
  email: 'prabhasgorusu001@gmail.com',
  phone: '+91 98765 43210',
  role: 'patient',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  joinedDate: 'January 2026'
};

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Prabhas Gorusu',
    phone: '+91 98765 43210',
    addressLine1: 'Flat 402, Sri Sai Nilayam, 12-34 Main Road',
    addressLine2: 'Near Government General Hospital, Ramanayyapeta',
    landmark: 'Opposite Apollo Diagnostic Centre',
    city: 'Kakinada',
    state: 'Andhra Pradesh',
    pincode: '533001',
    type: 'Home',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Prabhas Gorusu',
    phone: '+91 98765 43210',
    addressLine1: 'Tech Park, 3rd Floor, Tower B, Port Road',
    city: 'Kakinada',
    state: 'Andhra Pradesh',
    pincode: '533003',
    type: 'Work',
    isDefault: false
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-2026-001',
    fileName: 'prescription_dr_ananya_cardio.pdf',
    fileUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    fileSize: '1.8 MB',
    uploadedAt: '24 Sep 2026, 10:15 AM',
    patientName: 'Prabhas Gorusu',
    doctorName: 'Dr. Ananya Rao (Cardiology)',
    status: 'Approved',
    notes: 'Prescription for Telma 40 & Atorva 20 quarterly maintenance',
    pharmacistNotes: 'Verified by Chief Pharmacist S. Varma (Reg #AP-PH-8842). Safe to dispense.',
    associatedOrderId: 'MED-20260924-001'
  },
  {
    id: 'rx-2026-002',
    fileName: 'chest_consultation_rx.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    fileSize: '2.4 MB',
    uploadedAt: '26 Sep 2026, 04:30 PM',
    patientName: 'Prabhas Gorusu',
    doctorName: 'Dr. Priya Sundaram (General Medicine)',
    status: 'Under Review',
    notes: 'Augmentin Duo 625mg antibiotic 5-day course',
    pharmacistNotes: 'Currently in queue for dose confirmation by Clinical Pharmacist on duty.'
  },
  {
    id: 'rx-2026-003',
    fileName: 'skin_dermatology_memo.png',
    fileUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    fileSize: '950 KB',
    uploadedAt: '18 Sep 2026, 02:00 PM',
    patientName: 'Prabhas Gorusu',
    doctorName: 'Dr. Ramesh Babu (Dermatology)',
    status: 'Requires Clarification',
    notes: 'Ointment application instructions',
    pharmacistNotes: 'The date on the prescription slip is slightly smudged. Please provide clear clinic receipt or re-upload.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'MED-20260924-001',
    createdAt: '24 Sep 2026, 11:20 AM',
    items: [
      {
        productId: 'prod-5',
        productName: 'Telma 40 Blood Pressure Tablets',
        genericName: 'Telmisartan IP 40mg',
        price: 236,
        mrp: 295,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
        prescriptionRequired: true
      },
      {
        productId: 'prod-7',
        productName: 'Uprise-D3 60K Cholecalciferol Softgels',
        genericName: 'Cholecalciferol IP 60,000 IU',
        price: 116,
        mrp: 145,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
        prescriptionRequired: false
      },
      {
        productId: 'prod-1',
        productName: 'Crocin Advance Paracetamol 500mg',
        genericName: 'Paracetamol IP',
        price: 32,
        mrp: 40,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        prescriptionRequired: false
      }
    ],
    shippingAddress: INITIAL_ADDRESSES[0],
    deliveryMethod: {
      id: 'express',
      title: 'Express Hospital Courier',
      estimatedDays: 'Same Day Delivery (By 7:00 PM)',
      price: 80
    },
    paymentMethod: {
      type: 'UPI',
      transactionId: 'UPI-TXN-88910482',
      status: 'Success'
    },
    pricing: {
      subtotal: 652,
      deliveryFee: 80,
      discount: 83,
      total: 649,
      couponCode: 'CARE20'
    },
    currentStatus: 'Out for Delivery',
    timeline: [
      {
        status: 'Order Placed',
        timestamp: '24 Sep 2026, 11:20 AM',
        completed: true,
        current: false,
        description: 'Order placed via ApexCare Hospital Online Pharmacy.'
      },
      {
        status: 'Payment Confirmed',
        timestamp: '24 Sep 2026, 11:21 AM',
        completed: true,
        current: false,
        description: 'Online payment of ₹649 confirmed via UPI.'
      },
      {
        status: 'Pharmacist Approved',
        timestamp: '24 Sep 2026, 11:45 AM',
        completed: true,
        current: false,
        description: 'Prescription verified & signed by Chief Pharmacist S. Varma.'
      },
      {
        status: 'Preparing Order',
        timestamp: '24 Sep 2026, 01:10 PM',
        completed: true,
        current: false,
        description: 'Batches picked from hospital cold-storage & scanned.'
      },
      {
        status: 'Packed',
        timestamp: '24 Sep 2026, 02:00 PM',
        completed: true,
        current: false,
        description: 'Tamper-proof medical packaging sealed with thermal temperature monitor.'
      },
      {
        status: 'Out for Delivery',
        timestamp: '24 Sep 2026, 03:30 PM',
        completed: true,
        current: true,
        description: 'Delivery associate Rajesh K. (+91 94401 23456) dispatched with your package.'
      },
      {
        status: 'Delivered',
        timestamp: 'Expected Today by 6:30 PM',
        completed: false,
        current: false,
        description: 'Package will be handed over with OTP verification.'
      }
    ],
    prescriptionId: 'rx-2026-001',
    isPrescriptionVerified: true
  },
  {
    id: 'ord-102',
    orderNumber: 'MED-20260910-088',
    createdAt: '10 Sep 2026, 02:15 PM',
    items: [
      {
        productId: 'prod-8',
        productName: 'Omron HEM 7120 Digital BP Monitor',
        genericName: 'Digital Sphygmomanometer',
        price: 1999,
        mrp: 2450,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80',
        prescriptionRequired: false
      }
    ],
    shippingAddress: INITIAL_ADDRESSES[0],
    deliveryMethod: {
      id: 'standard',
      title: 'Standard Delivery',
      estimatedDays: '2 Days',
      price: 0
    },
    paymentMethod: {
      type: 'Credit/Debit Card',
      transactionId: 'CARD-TXN-11009',
      status: 'Success'
    },
    pricing: {
      subtotal: 1999,
      deliveryFee: 0,
      discount: 100,
      total: 1899,
      couponCode: 'WELLNESS100'
    },
    currentStatus: 'Delivered',
    timeline: [
      {
        status: 'Order Placed',
        timestamp: '10 Sep 2026, 02:15 PM',
        completed: true,
        current: false,
        description: 'Order placed successfully.'
      },
      {
        status: 'Payment Confirmed',
        timestamp: '10 Sep 2026, 02:16 PM',
        completed: true,
        current: false,
        description: 'Card payment of ₹1899 confirmed.'
      },
      {
        status: 'Pharmacist Approved',
        timestamp: '10 Sep 2026, 02:30 PM',
        completed: true,
        current: false,
        description: 'Device certified and inspected.'
      },
      {
        status: 'Preparing Order',
        timestamp: '10 Sep 2026, 03:00 PM',
        completed: true,
        current: false,
        description: 'Warranty card and battery pack assembled.'
      },
      {
        status: 'Packed',
        timestamp: '10 Sep 2026, 04:30 PM',
        completed: true,
        current: false,
        description: 'Safely packed in cushioned box.'
      },
      {
        status: 'Out for Delivery',
        timestamp: '12 Sep 2026, 09:00 AM',
        completed: true,
        current: false,
        description: 'Dispatched for morning delivery.'
      },
      {
        status: 'Delivered',
        timestamp: '12 Sep 2026, 12:15 PM',
        completed: true,
        current: true,
        description: 'Delivered to Prabhas Gorusu. Signed.'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order Dispatched',
    message: 'Your order #MED-20260924-001 is out for delivery with our hospital courier partner.',
    time: '25 mins ago',
    read: false,
    type: 'order',
    link: '/orders/MED-20260924-001'
  },
  {
    id: 'notif-2',
    title: 'Prescription Approved ✓',
    message: 'Chief Pharmacist S. Varma approved your prescription for Telma 40 & Atorva 20.',
    time: '2 hours ago',
    read: false,
    type: 'prescription',
    link: '/prescriptions'
  },
  {
    id: 'notif-3',
    title: 'Vitamin D3 Back in Stock',
    message: 'Uprise-D3 60K Softgel Capsules are back in hospital inventory.',
    time: 'Yesterday',
    read: true,
    type: 'stock',
    link: '/product/vitamin-d3-60k-capsules'
  },
  {
    id: 'notif-4',
    title: 'Welcome Discount Active',
    message: 'Use code FIRSTMED25 to enjoy 25% off on your next health refill.',
    time: '3 days ago',
    read: true,
    type: 'offer',
    link: '/offers'
  }
];
