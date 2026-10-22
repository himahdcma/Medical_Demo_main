import React from 'react';
import { Link } from 'react-router-dom';
import { Cross, ShieldCheck, PhoneCall, Mail, MapPin, Award, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges / Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">100% Genuine</span>
              <span className="text-slate-400 text-[11px]">Direct Hospital Sourced</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Award className="w-6 h-6 text-medical-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">NABH Accredited</span>
              <span className="text-slate-400 text-[11px]">Licensed Clinical Pharmacy</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Clock className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">24/7 Dispatch</span>
              <span className="text-slate-400 text-[11px]">Emergency Medicine Supply</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <PhoneCall className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Doctor Consultation</span>
              <span className="text-slate-400 text-[11px]">Top Hospital Specialists</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10 border-b border-slate-800 text-xs">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-medical-500 flex items-center justify-center text-white">
                <Cross className="w-5 h-5 stroke-[2.4]" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                ApexCare Hospital
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ApexCare Hospital Pharmacy is the premier digital extension of our super-specialty hospital. We dispense authentic, temperature-controlled pharmaceuticals verified by senior clinical hospital pharmacists.
            </p>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-medical-400 shrink-0" />
                <span>ApexCare Super Specialty Hospital Campus, Main Road, Kakinada - 533001</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-medical-400 shrink-0" />
                <span>Emergency Pharmacy Helpline: 1800-419-8800 (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-medical-400 shrink-0" />
                <span>pharmacy@apexcarehospital.org</span>
              </div>
            </div>
          </div>

          {/* Medicines & Healthcare */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Medicines & Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/medicines/prescription-medicines" className="hover:text-white transition-colors">Prescription Drugs</Link></li>
              <li><Link to="/medicines/fever-cold" className="hover:text-white transition-colors">Fever & Pain Relief</Link></li>
              <li><Link to="/medicines/diabetes-care" className="hover:text-white transition-colors">Diabetes Care</Link></li>
              <li><Link to="/medicines/heart-care" className="hover:text-white transition-colors">Heart & Hypertension</Link></li>
              <li><Link to="/medicines/vitamins" className="hover:text-white transition-colors">Vitamins & Supplements</Link></li>
              <li><Link to="/medicines/medical-devices" className="hover:text-white transition-colors">Medical Devices</Link></li>
            </ul>
          </div>

          {/* Hospital & Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Hospital & Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/hospital" className="hover:text-white transition-colors">About Our Hospital</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Our Specialist Doctors</Link></li>
              <li><Link to="/appointments" className="hover:text-white transition-colors">Book OPD Consultation</Link></li>
              <li><Link to="/prescriptions/upload" className="hover:text-white transition-colors">Upload Prescription</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Health Packages & Offers</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">24/7 Patient Helpdesk</Link></li>
            </ul>
          </div>

          {/* Regulatory & Safety */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Licenses & Standards
            </h4>
            <div className="space-y-2 text-slate-400 text-[11px]">
              <p>Drug Retail License: <span className="text-white font-mono">AP-KKD-2024/902</span></p>
              <p>Wholesale License: <span className="text-white font-mono">AP-KKD-2024/903</span></p>
              <p>GSTIN: <span className="text-white font-mono">37AAACA1234F1Z8</span></p>
              <p>Pharmacist Council: <span className="text-white">Andhra Pradesh Pharmacy Council</span></p>
              <div className="pt-2">
                <Link to="/admin" className="text-medical-400 hover:text-medical-300 font-semibold underline">
                  Hospital Admin Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Medical Disclaimer */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Statutory Notice:</strong> Under the Drugs and Cosmetics Act and relevant healthcare regulations, all Schedule H and H1 medications require a valid physical or digital prescription issued by a registered medical practitioner. The medicine information provided on this portal is for patient educational purposes only. Do not self-medicate.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} ApexCare Hospital & Pharmacy. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/support" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/support" className="hover:text-slate-300">Terms of Clinical Dispensing</Link>
            <Link to="/support" className="hover:text-slate-300">Return & Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
