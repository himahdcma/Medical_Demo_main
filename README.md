# ApexCare Hospital & Pharmacy — Medical E-Commerce Platform

A **premium, modern, production-quality frontend** for an integrated hospital pharmacy and healthcare e-commerce platform.

---

## 🌟 Key Features

### 1. Patient & Customer Storefront
- **Clinical Header & Navigation**: Instant medicine search with fuzzy matches & typo tolerance ("Did you mean Paracetamol?"), location selector (Kakinada / 533001), order status, saved wishlist, and notifications center.
- **Hero & Trust Indicators**: NABH-accredited hospital badge, cold-chain temperature guarantee, and 24/7 pharmacist audit notice.
- **16 Medical Categories**: Horizontally scrollable catalog covering Prescription Medicines, OTC, Cardiac, Diabetes, Orthopedics, Pediatrics, Vitamins, and Medical Devices.
- **Interactive Product Catalog**: Product cards with dynamic states (Available, Schedule H Prescription Required, Low Stock with remaining units, Out of Stock with Notify Me).
- **Product Detail Experience**:
  - Image gallery with zoom preview.
  - Comprehensive clinical tabs: Overview, Uses & Indications, Dosage & Directions, Ingredients & Salt, Warnings & Contraindications, Clinical Precautions, Side Effects, Storage & Cold-Chain, and Manufacturer info.
  - Statutory Medical Safety Disclaimers.
- **Prescription Workflow**:
  - Drag-and-drop file upload supporting JPG, PNG, PDF up to 10 MB.
  - Instant file preview, replace, and delete controls.
  - Attending doctor & department assignment.
  - Real-time audit status tracking: *Uploaded*, *Under Review*, *Approved*, *Requires Clarification*, *Rejected*.
- **Shopping Cart**:
  - Quantity controls, save for later, and instant coupon discounts (`FIRSTMED25`, `CARE20`, `WELLNESS100`).
  - Free delivery calculation with visual progress bar.
- **4-Step Checkout**:
  - **Step 1 — Address**: Multi-address manager with modal to save new delivery locations.
  - **Step 2 — Shipping Method**: Standard Courier, Express Hospital Same-Day, or Hospital Pharmacy Counter Pickup.
  - **Step 3 — Payment**: Simulated UPI, Credit/Debit Card, Net Banking, Wallet, and COD (includes a failure simulation toggle for testing error recovery).
  - **Step 4 — Confirmation & Tracking**: Confetti celebration, order invoice generator, and interactive 7-step fulfillment timeline.
- **Doctor Directory & OPD Booking**:
  - Specialist doctor profiles (Cardiology, Endocrinology, Pediatrics, Orthopedics, Neurology, General Medicine).
  - Calendar slot selection with morning/evening appointments and token generation.
- **Customer Dashboard**: Overview metrics (Total Orders, Active Orders, Prescriptions, Wishlist), recent orders, and account settings.

### 2. Hospital Admin & Pharmacist Console
- **Hospital Admin Dashboard (`/admin`)**:
  - High-level KPIs: Monthly Revenue, Orders, Patients, Active Medicines, Pending Audits, Low Stock Alerts.
  - **Recharts Analytics**: Monthly revenue area chart and therapeutic category breakdown chart.
- **Prescription Review Panel (`/admin/prescriptions`)**: Full audit workflow allowing hospital pharmacists to inspect uploaded slips, add clinical remarks, and Approve / Reject / Request Clarification.
- **Product Management (`/admin/products`)**: Table with search, category filtering, delete, and "+ Add Medicine" modal.
- **Dispensary Inventory & Batch Management (`/admin/inventory`)**: Lot batch tracking, expiry date monitors, and cold-chain temperature verification.
- **Courier Dispatch Board (`/admin/delivery`)**: GPS fleet map view, parcel assignments, phone shortcuts, and OTP handover confirmations.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + PostCSS + Autoprefixer
- **State Management**: Zustand (with `localStorage` persistence for Cart, Wishlist, Auth, Prescriptions, and Orders)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **Data Visualization**: Recharts
- **Celebration Effects**: Canvas Confetti

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```text
src/
├── components/
│   ├── cart/             # CartItem, PriceSummary
│   ├── checkout/         # AddressCard, AddressModal, DeliveryMethodSelect, PaymentSelect
│   ├── common/           # Badge, Button, Modal, Drawer, Rating, Breadcrumb, Skeleton, EmptyState
│   ├── doctors/          # DoctorCard, AppointmentModal
│   ├── layout/           # Header, MobileHeader, MobileBottomNav, Footer, Modals
│   ├── orders/           # OrderCard, OrderTimeline
│   ├── prescription/     # PrescriptionUploader, PrescriptionStatusCard
│   └── product/          # ProductCard, ProductGrid, FilterSidebar, SearchDropdown
├── data/                 # Categories, Products, Doctors, Offers, FAQs, MockData
├── layouts/              # RootLayout
├── pages/
│   ├── Admin/            # AdminLayout, AdminDashboard, AdminProducts, AdminPrescriptions, AdminInventory, AdminDelivery
│   ├── Auth/             # LoginPage, RegisterPage, ForgotPasswordPage
│   ├── Cart/             # CartPage
│   ├── Checkout/         # CheckoutPage
│   ├── Doctors/          # DoctorsPage, DoctorDetailPage, AppointmentsPage
│   ├── Home/             # HomePage
│   ├── Hospital/         # HospitalPage
│   ├── Medicines/        # MedicinesPage
│   ├── Offers/           # OffersPage
│   ├── Orders/           # OrdersPage, OrderDetailPage, OrderSuccessPage
│   ├── Prescription/     # PrescriptionPage, UploadPrescriptionPage
│   ├── Product/          # ProductDetailPage
│   ├── Profile/          # ProfilePage
│   ├── Support/          # SupportPage
│   └── Wishlist/         # WishlistPage
├── services/             # mockApi.ts
├── store/                # Zustand stores (Cart, Wishlist, Auth, Orders, Prescriptions, Notifications)
├── types/                # TypeScript interfaces
└── utils/                # Formatters & cn helpers
```

---

## 🌿 Git & Repository Setup

To commit and push this project to your new GitHub account:

```bash
git add .
git commit -m "feat: complete hospital pharmacy and medical e-commerce frontend"
git branch -M main
git remote add origin https://github.com/<your-new-username>/<your-repo-name>.git
git push -u origin main
```
