import { Offer } from '../types';

export const OFFERS: Offer[] = [
  {
    id: 'off-1',
    code: 'FIRSTMED25',
    title: 'Welcome Health Gift',
    description: 'Flat 25% OFF on your first medicine and healthcare order above ₹399',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValue: 399,
    expiryDate: '31 Dec 2026',
    badge: 'NEW USER'
  },
  {
    id: 'off-2',
    code: 'CARE20',
    title: 'Hospital Pharmacy Privilege',
    description: 'Get 20% discount on all prescription cardiovascular & diabetes medications',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 500,
    expiryDate: '15 Nov 2026',
    badge: 'POPULAR'
  },
  {
    id: 'off-3',
    code: 'FREESHIP',
    title: 'Free Express Delivery',
    description: 'Zero delivery charges on all hospital orders dispatched to your doorstep',
    discountType: 'fixed',
    discountValue: 40,
    minOrderValue: 450,
    expiryDate: '30 Nov 2026',
    badge: 'DELIVERY'
  },
  {
    id: 'off-4',
    code: 'WELLNESS100',
    title: 'Vitamins & Devices Bonus',
    description: 'Flat ₹100 instant reduction on healthcare devices & nutritional supplements',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 999,
    expiryDate: '25 Dec 2026',
    badge: 'DEVICES'
  },
  {
    id: 'off-5',
    code: 'SENIORCARE15',
    title: 'Elderly Wellness Benefit',
    description: 'Dedicated 15% discount for chronic disease refills and orthopedic care',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 600,
    expiryDate: '31 Dec 2026',
    badge: 'CHRONIC CARE'
  }
];
