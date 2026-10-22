import React from 'react';
import { Truck, Zap, Building2, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export interface DeliveryOption {
  id: 'standard' | 'express' | 'hospital_pickup';
  title: string;
  subtitle: string;
  estimatedTime: string;
  price: number;
  badge?: string;
}

interface DeliveryMethodSelectProps {
  selected: 'standard' | 'express' | 'hospital_pickup';
  onSelect: (option: 'standard' | 'express' | 'hospital_pickup') => void;
  subtotal: number;
}

export const DeliveryMethodSelect: React.FC<DeliveryMethodSelectProps> = ({
  selected,
  onSelect,
  subtotal,
}) => {
  const isFreeDelivery = subtotal >= 500;

  const options: DeliveryOption[] = [
    {
      id: 'standard',
      title: 'Standard Courier Delivery',
      subtitle: 'Dispatched through certified medical couriers',
      estimatedTime: '2 - 3 Days',
      price: isFreeDelivery ? 0 : 40,
      badge: isFreeDelivery ? 'FREE OVER ₹500' : undefined,
    },
    {
      id: 'express',
      title: 'Express Hospital Dispatch',
      subtitle: 'Priority same-day dispatch by dedicated hospital riders',
      estimatedTime: 'Today by 7:00 PM',
      price: 80,
      badge: 'FASTEST',
    },
    {
      id: 'hospital_pickup',
      title: 'Hospital Pharmacy Counter Pickup',
      subtitle: 'Ready in 30 minutes at ApexCare Main OPD Counter 4',
      estimatedTime: 'Ready in 30 Mins',
      price: 0,
      badge: 'FREE ALWAYS',
    },
  ];

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <div
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
              isSelected
                ? 'border-medical-600 bg-medical-50/40 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-medical-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {opt.id === 'standard' && <Truck className="w-5 h-5" />}
                {opt.id === 'express' && <Zap className="w-5 h-5" />}
                {opt.id === 'hospital_pickup' && <Building2 className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                  {opt.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{opt.subtitle}</p>
                <div className="text-xs font-semibold text-medical-700 mt-1">
                  Est. Delivery: {opt.estimatedTime}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-sm font-extrabold text-slate-900 block">
                  {opt.price === 0 ? 'FREE' : formatCurrency(opt.price)}
                </span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-medical-600 bg-medical-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
