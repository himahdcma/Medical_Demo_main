export interface FAQItem {
  id: string;
  category: 'Orders' | 'Payments' | 'Prescription' | 'Delivery' | 'Returns' | 'Medicines' | 'Account';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Prescription',
    question: 'Why is a prescription required for certain medicines?',
    answer: 'Under statutory healthcare safety regulations (Schedule H and H1 medications), antibiotics, hypertension drugs, and critical therapeutics can only be dispensed against a valid prescription issued by a registered medical practitioner to ensure patient safety and avoid harmful drug interactions.'
  },
  {
    id: 'faq-2',
    category: 'Prescription',
    question: 'How do hospital pharmacists verify uploaded prescriptions?',
    answer: 'Our licensed hospital clinical pharmacists inspect every uploaded prescription for doctor registration credentials, patient name, dosage instructions, and valid issue date. Verification is usually completed within 15–30 minutes.'
  },
  {
    id: 'faq-3',
    category: 'Delivery',
    question: 'What are the delivery timelines and express delivery options?',
    answer: 'Standard delivery reaches within 24 to 48 hours. Express Hospital Courier delivers within 4 to 6 hours for local hospital catchment zones. You can also opt for immediate Hospital Pharmacy Counter pickup at zero cost.'
  },
  {
    id: 'faq-4',
    category: 'Orders',
    question: 'How can I track my medicine order progress?',
    answer: 'Navigate to "Orders" from the top navigation or your dashboard. Each order features an interactive 7-step timeline detailing order reception, pharmacist verification, temperature-controlled packing, and delivery partner tracking.'
  },
  {
    id: 'faq-5',
    category: 'Medicines',
    question: 'Are all medicines stored in temperature-controlled environments?',
    answer: 'Yes! As an accredited hospital pharmacy, all biologicals, insulins, vaccines, and sensitive tablets are maintained in calibrated cold-chain storage (2°C to 8°C or <25°C) with continuous 24/7 digital thermal monitoring.'
  },
  {
    id: 'faq-6',
    category: 'Payments',
    question: 'Which payment methods are accepted?',
    answer: 'We support all major payment gateways including UPI (Google Pay, PhonePe, Paytm), Visa/Mastercard/RuPay Credit and Debit cards, Net Banking, Medical Wallets, and Cash on Delivery.'
  },
  {
    id: 'faq-7',
    category: 'Returns',
    question: 'What is the return policy for medicines?',
    answer: 'Sealed, un-tampered healthcare devices, wellness products, and OTC items can be returned within 7 days of delivery. For patient safety, prescription pharmaceuticals cannot be restocked once dispatched, unless damaged or incorrect.'
  },
  {
    id: 'faq-8',
    category: 'Account',
    question: 'Can I add multiple family member profiles and delivery addresses?',
    answer: 'Yes! From your account settings, you can save multiple delivery addresses (Home, Office, Parents) and upload individual prescriptions mapped to respective family members.'
  }
];
