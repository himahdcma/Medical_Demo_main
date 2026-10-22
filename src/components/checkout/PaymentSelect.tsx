import React, { useState } from 'react';
import { QrCode, CreditCard, Landmark, Wallet, Banknote, ShieldCheck, Check } from 'lucide-react';

export type PaymentMethodType =
  | 'UPI'
  | 'Credit/Debit Card'
  | 'Net Banking'
  | 'Wallet'
  | 'Cash on Delivery';

interface PaymentSelectProps {
  selected: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
  simulateFailure: boolean;
  setSimulateFailure: (val: boolean) => void;
}

export const PaymentSelect: React.FC<PaymentSelectProps> = ({
  selected,
  onSelect,
  simulateFailure,
  setSimulateFailure,
}) => {
  const [upiId, setUpiId] = useState('prabhas@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');

  const methods: {
    id: PaymentMethodType;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    {
      id: 'UPI',
      title: 'UPI (Google Pay, PhonePe, Paytm, UPI ID)',
      description: 'Instant zero-fee verification via QR or Virtual Payment Address',
      icon: <QrCode className="w-5 h-5" />,
      badge: 'RECOMMENDED',
    },
    {
      id: 'Credit/Debit Card',
      title: 'Credit / Debit Card',
      description: 'Visa, MasterCard, RuPay, Maestro with 3D Secure OTP',
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 'Net Banking',
      title: 'Net Banking',
      description: 'All Indian banks (SBI, HDFC, ICICI, Axis, Kotak)',
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      id: 'Wallet',
      title: 'Health & Digital Wallets',
      description: 'Paytm, PhonePe, Amazon Pay, MediWallet',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 'Cash on Delivery',
      title: 'Cash on Delivery (COD)',
      description: 'Pay via cash or UPI scan when your parcel is delivered',
      icon: <Banknote className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {methods.map((method) => {
          const isSelected = selected === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-medical-600 bg-medical-50/30 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-medical-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {method.title}
                      </h4>
                      {method.badge && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-medical-100 text-medical-800">
                          {method.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{method.description}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-medical-600 bg-medical-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              {/* Sub-inputs when selected */}
              {isSelected && method.id === 'UPI' && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-3 text-xs">
                  <span className="text-slate-500 font-semibold shrink-0">Simulated VPA:</span>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-medical-500"
                  />
                  <span className="text-emerald-600 font-bold shrink-0 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              )}

              {isSelected && method.id === 'Credit/Debit Card' && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center gap-3 text-xs">
                  <span className="text-slate-500 font-semibold shrink-0">Test Card:</span>
                  <input
                    type="text"
                    disabled
                    value={cardNumber}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 font-mono"
                  />
                  <span className="text-slate-400 font-medium">Exp: 08/29</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Demo toggle for test simulation */}
      <div className="p-3 bg-slate-100 rounded-xl text-xs flex items-center justify-between text-slate-600">
        <div>
          <span className="font-bold text-slate-800 block">Frontend Payment Simulation</span>
          <span className="text-[11px] text-slate-500">
            Toggle to test failed payment recovery flow or successful checkout
          </span>
        </div>
        <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
          />
          <span className={simulateFailure ? 'text-red-600 font-bold' : ''}>
            Simulate Fail
          </span>
        </label>
      </div>
    </div>
  );
};
