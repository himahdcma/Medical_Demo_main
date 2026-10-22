import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileUp,
  ShoppingBag,
  ShieldCheck,
  Stethoscope,
  Truck,
  Building2,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Thermometer,
  HeartPulse,
  Clock,
  PhoneCall,
  Pill
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ProductCard } from '../../components/product/ProductCard';
import { DoctorCard } from '../../components/doctors/DoctorCard';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { DOCTORS } from '../../data/doctors';
import { OFFERS } from '../../data/offers';
import { formatCurrency } from '../../utils/formatters';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller || p.rating >= 4.8).slice(0, 4);
  const featuredDoctors = DOCTORS.slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-medical-50/70 via-white to-slate-50 pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Clinical Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>NABH Accredited Hospital Digital Pharmacy</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Trusted <span className="text-medical-600">Hospital Pharmacy</span>, Now Online
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Order genuine medicines, cold-chain therapeutics, and hospital-grade healthcare essentials directly from our hospital dispensary. Verified by senior clinical pharmacists.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link to="/medicines" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full shadow-lg shadow-medical-200">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Shop Medicines</span>
                  </Button>
                </Link>

                <Link to="/prescriptions/upload" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full bg-white hover:bg-slate-50 border-slate-300">
                    <FileUp className="w-5 h-5 text-teal-600" />
                    <span>Upload Prescription</span>
                  </Button>
                </Link>
              </div>

              {/* Emergency Hotline Banner */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>24/7 Hospital Dispatch</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <PhoneCall className="w-4 h-4 text-medical-600" />
                  <span>Emergency Hotline: 1800-419-8800</span>
                </div>
              </div>
            </div>

            {/* Right Visual Section */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main image with rounded modern frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                    alt="ApexCare Hospital Clinical Pharmacist"
                    className="w-full h-[380px] sm:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/20">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-teal-300" />
                      <span className="text-xs font-bold">ApexCare Clinical Dispensary</span>
                    </div>
                    <p className="text-[11px] text-slate-200 mt-0.5">
                      100% sterile handling & direct physician coordination
                    </p>
                  </div>
                </div>

                {/* Floating Trust Card 1 */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Pharmacist Verified</span>
                    <span className="text-[10px] text-slate-500">Every single order checked</span>
                  </div>
                </div>

                {/* Floating Trust Card 2 */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500">
                  <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Cold-Chain Stored</span>
                    <span className="text-[10px] text-slate-500">2°C - 8°C Digital monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Genuine Medicines</h4>
              <p className="text-[11px] text-slate-500">Direct hospital procurement</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Pharmacist Verified</h4>
              <p className="text-[11px] text-slate-500">Clinical safety audit</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Secure Payments</h4>
              <p className="text-[11px] text-slate-500">Encrypted transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Fast Delivery</h4>
              <p className="text-[11px] text-slate-500">Same-day hospital dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Hospital Trusted</h4>
              <p className="text-[11px] text-slate-500">25+ Years clinical care</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Shop by Medical Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Browse authenticated therapeutics, diagnostic devices, and OTC remedies
            </p>
          </div>
          <Link
            to="/medicines"
            className="text-xs sm:text-sm font-bold text-medical-600 hover:text-medical-800 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories scrollable container */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/medicines/${cat.slug}`}
              className="flex-shrink-0 w-36 sm:w-44 bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 hover:border-medical-300 shadow-2xs hover:shadow-card-hover transition-all duration-200 text-center group flex flex-col items-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mb-3 border border-slate-100 group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-medical-600 transition-colors line-clamp-2 leading-tight">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 mt-1 font-medium">
                {cat.itemCount}+ Items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Quick Prescription Upload Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-medical-800 to-teal-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-teal-200 text-xs font-bold">
                <FileUp className="w-3.5 h-3.5" />
                <span>Express Prescription Dispensing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Have a Doctor's Prescription?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Just upload a photo or PDF of your doctor's prescription. Our hospital pharmacist will review the dosages, prepare your medicines, and deliver them safely to your doorstep.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-teal-100 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-300" /> Free Pharmacist Audit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-300" /> Digital Refill Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-300" /> Doorstep Delivery
                </span>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-start md:justify-end">
              <Link to="/prescriptions/upload">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white hover:bg-slate-100 text-medical-900 font-extrabold shadow-lg"
                >
                  <FileUp className="w-5 h-5 text-teal-700" />
                  <span>Upload Prescription Now</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-medical-600 bg-medical-50 px-2 py-0.5 rounded uppercase">
                Hospital Essentials
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Medicines & Healthcare
            </h2>
          </div>
          <Link
            to="/medicines"
            className="text-xs sm:text-sm font-bold text-medical-600 hover:text-medical-800 flex items-center gap-1 group"
          >
            <span>Explore Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Promotional Offers & Healthcare Vouchers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hospital Privilege Coupons & Offers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Save more on regular chronic disease refills, wellness devices, and lab care
            </p>
          </div>
          <Link
            to="/offers"
            className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>All Offers</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFERS.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl p-5 border border-amber-200/80 shadow-2xs hover:shadow-xs transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                  {offer.badge}
                </span>
                <span className="text-[11px] text-slate-400">Valid till {offer.expiryDate}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{offer.title}</h3>
              <p className="text-xs text-slate-600 mb-4">{offer.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                <div className="font-mono text-xs font-extrabold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-dashed border-amber-300">
                  {offer.code}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(offer.code);
                    alert(`Coupon code ${offer.code} copied to clipboard!`);
                  }}
                  className="text-xs font-bold text-medical-600 hover:text-medical-800 cursor-pointer"
                >
                  Copy Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Doctor Consultations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Consult Top Hospital Doctors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Need medical guidance or a new prescription? Book an OPD slot today.
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-xs sm:text-sm font-bold text-medical-600 hover:text-medical-800 flex items-center gap-1 group"
          >
            <span>View All Doctors</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* 8. Hospital Pharmacy Advantage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider block mb-1">
              The Clinical Difference
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Choose Hospital Pharmacy Over Retailers?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Unlike generic commercial marketplaces, our medicines come straight from hospital central inventory with uninterrupted clinical accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Thermometer className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Cold-Chain Temperature Control</h4>
              <p className="text-slate-400 leading-relaxed">
                Biological therapeutics, insulins, and sensitive antibiotics are held under constant 2°C to 8°C thermal supervision.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-medical-500/20 text-medical-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Direct Batch Verification</h4>
              <p className="text-slate-400 leading-relaxed">
                Zero chance of counterfeit stock. Every batch is traced directly from pharmaceutical manufacturers with verified QA certificates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Hospital Specialist Alignment</h4>
              <p className="text-slate-400 leading-relaxed">
                Direct integration with our hospital electronic health records and consultant physicians for instant prescription clarification.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
