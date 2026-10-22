import React from 'react';
import { OrderTimelineStep } from '../../types';
import { Check, Clock, PackageCheck, Stethoscope, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

interface OrderTimelineProps {
  steps: OrderTimelineStep[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ steps }) => {
  const getStepIcon = (statusName: string, isCompleted: boolean) => {
    switch (statusName) {
      case 'Order Placed':
        return <Check className="w-4 h-4" />;
      case 'Payment Confirmed':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Pharmacist Approved':
        return <Stethoscope className="w-4 h-4" />;
      case 'Preparing Order':
        return <PackageCheck className="w-4 h-4" />;
      case 'Packed':
        return <PackageCheck className="w-4 h-4" />;
      case 'Out for Delivery':
        return <Truck className="w-4 h-4" />;
      case 'Delivered':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {steps.map((step, idx) => {
        return (
          <div key={idx} className="relative flex items-start gap-4 group">
            {/* Dot / Icon Circle */}
            <div
              className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ring-4 ${
                step.completed
                  ? 'bg-emerald-600 text-white ring-emerald-100 shadow-xs'
                  : step.current
                  ? 'bg-medical-600 text-white ring-medical-100 animate-pulse-subtle'
                  : 'bg-slate-100 text-slate-400 ring-white'
              }`}
            >
              {getStepIcon(step.status, step.completed)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4
                  className={`text-sm font-bold ${
                    step.completed
                      ? 'text-slate-900'
                      : step.current
                      ? 'text-medical-700'
                      : 'text-slate-400'
                  }`}
                >
                  {step.status}
                </h4>
                <span
                  className={`text-xs ${
                    step.completed ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {step.timestamp}
                </span>
              </div>
              <p
                className={`text-xs mt-1 leading-relaxed ${
                  step.completed || step.current ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
