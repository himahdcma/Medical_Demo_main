import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/Home/HomePage';
import { MedicinesPage } from './pages/Medicines/MedicinesPage';
import { ProductDetailPage } from './pages/Product/ProductDetailPage';
import { CartPage } from './pages/Cart/CartPage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage';
import { OrderSuccessPage } from './pages/Orders/OrderSuccessPage';
import { OrdersPage } from './pages/Orders/OrdersPage';
import { OrderDetailPage } from './pages/Orders/OrderDetailPage';
import { PrescriptionPage } from './pages/Prescription/PrescriptionPage';
import { UploadPrescriptionPage } from './pages/Prescription/UploadPrescriptionPage';
import { WishlistPage } from './pages/Wishlist/WishlistPage';
import { DoctorsPage } from './pages/Doctors/DoctorsPage';
import { DoctorDetailPage } from './pages/Doctors/DoctorDetailPage';
import { AppointmentsPage } from './pages/Doctors/AppointmentsPage';
import { HospitalPage } from './pages/Hospital/HospitalPage';
import { OffersPage } from './pages/Offers/OffersPage';
import { SupportPage } from './pages/Support/SupportPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';

// Admin / Pharmacist Portal
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminProducts } from './pages/Admin/AdminProducts';
import { AdminOrders } from './pages/Admin/AdminOrders';
import { AdminPrescriptions } from './pages/Admin/AdminPrescriptions';
import { AdminInventory } from './pages/Admin/AdminInventory';
import { AdminDelivery } from './pages/Admin/AdminDelivery';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Main Customer & Patient Storefront Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="medicines" element={<MedicinesPage />} />
          <Route path="medicines/:category" element={<MedicinesPage />} />
          <Route path="product/:slug" element={<ProductDetailPage />} />
          <Route path="search" element={<MedicinesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="prescriptions" element={<PrescriptionPage />} />
          <Route path="prescriptions/upload" element={<UploadPrescriptionPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="doctors/:id" element={<DoctorDetailPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="hospital" element={<HospitalPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="faq" element={<SupportPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Hospital Pharmacy Admin & Pharmacist Console */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="prescriptions" element={<AdminPrescriptions />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="delivery" element={<AdminDelivery />} />
          <Route path="customers" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDashboard />} />
          <Route path="coupons" element={<AdminDashboard />} />
          <Route path="reviews" element={<AdminDashboard />} />
          <Route path="reports" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
