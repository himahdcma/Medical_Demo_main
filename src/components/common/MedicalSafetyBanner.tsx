import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/formatters';

interface MedicalSafetyBannerProps {
  type?: 'prescription-warning' | 'clinical-disclaimer' | 'pharmacist-seal';
  className?: string;
}

export const MedicalSafetyBanner: React.FC<MedicalSafetyBannerProps> = ({
  type = 'prescription-warning',
  className,
}) => {
  if (type === 'prescription-warning') {
    return (
      <div
        className={cn(
          'flex items-start gap-3 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-amber-900',
          className
        )}
      >
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold block text-amber-950">
            Prescription Required (Schedule H/H1)
          </span>
          Our licensed hospital clinical pharmacists will audit your uploaded prescription before dispensing. Please keep your original prescription ready upon doorstep delivery.
        </div>
      </div>
    );
  }

  if (type === 'pharmacist-seal') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl text-emerald-900',
          className
        )}
      >
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs">
          <span className="font-bold text-emerald-950">100% Genuine Hospital Sourced: </span>
          Stored under strict temperature-controlled cold chains and dispensed by licensed healthcare pharmacists.
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-xs leading-relaxed',
        className
      )}
    >
      <span className="font-semibold text-slate-700 block mb-0.5">Medical Safety Disclaimer:</span>
      Medicine information provided on this platform is for educational and reference purposes only. It is not intended as a substitute for professional clinical medical advice, diagnosis, or treatment. Always follow your physician's prescription.
    </div>
  );
};
