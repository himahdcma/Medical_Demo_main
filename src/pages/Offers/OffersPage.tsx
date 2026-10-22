import React, { useState } from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { OFFERS } from '../../data/offers';
import { Tag, Sparkles, Copy, Check, Gift, Percent, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Offers & Healthcare Discounts' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Hospital Privilege Savings
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Medicine Discounts & Health Packages
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Exclusive vouchers and subsidized prescription refills provided directly by ApexCare Hospital Pharmacy.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-card-hover transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 uppercase tracking-wider">
                  {offer.badge}
                </span>
                <span className="text-xs text-slate-400">Expires: {offer.expiryDate}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{offer.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{offer.description}</p>
              <div className="text-[11px] text-slate-400 font-medium">
                Minimum Cart Value: ₹{offer.minOrderValue}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="font-mono text-sm font-extrabold text-medical-800 bg-medical-50 px-3 py-1.5 rounded-xl border border-dashed border-medical-300">
                {offer.code}
              </div>

              <Button
                onClick={() => handleCopy(offer.code)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Subsidized Healthcare Care Packages */}
      <div className="bg-gradient-to-r from-medical-900 to-teal-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-xl space-y-2">
          <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
            Chronic Care Subsidies
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Comprehensive Annual Health Refill Program
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enroll your parents or family members for chronic diabetes and cardiac quarterly deliveries with free home blood draws and complimentary physician follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
            <h4 className="font-bold text-white text-sm mb-1">Cardiac Care Bundle</h4>
            <p className="text-xs text-slate-300 mb-3">Telma, Atorva, BP monitor strips + 2 lipid profile lab tests</p>
            <div className="text-base font-extrabold text-teal-300">₹1,499 / 3 Months</div>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
            <h4 className="font-bold text-white text-sm mb-1">Diabetes Control Pack</h4>
            <p className="text-xs text-slate-300 mb-3">Glycomet SR + 50 Accu-Chek strips + Quarterly HbA1c test</p>
            <div className="text-base font-extrabold text-teal-300">₹1,299 / 3 Months</div>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/10">
            <h4 className="font-bold text-white text-sm mb-1">Senior Vitality Pack</h4>
            <p className="text-xs text-slate-300 mb-3">Vitamin D3, Calcium, Neurobion + Joint pain relief ointment</p>
            <div className="text-base font-extrabold text-teal-300">₹899 / 3 Months</div>
          </div>
        </div>

        <div className="pt-2">
          <Link to="/medicines">
            <Button variant="secondary" size="md">
              Order Packages Now →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
