import React from 'react';
import { Address } from '../../types';
import { MapPin, Phone, Check, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
        isSelected
          ? 'border-medical-600 bg-medical-50/30 shadow-xs'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={address.type === 'Home' ? 'primary' : 'secondary'}
            size="sm"
            className="uppercase tracking-wider font-bold"
          >
            {address.type}
          </Badge>
          {address.isDefault && (
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
              Default
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 text-slate-400 hover:text-red-500 rounded-md transition-colors"
              title="Delete address"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'border-medical-600 bg-medical-600 text-white'
                : 'border-slate-300 bg-white'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-xs">
        <h4 className="font-bold text-slate-900 text-sm">{address.fullName}</h4>
        <p className="text-slate-600 leading-relaxed">
          {address.addressLine1}
          {address.addressLine2 && `, ${address.addressLine2}`}
        </p>
        {address.landmark && (
          <p className="text-slate-500 italic">Landmark: {address.landmark}</p>
        )}
        <p className="text-slate-700 font-medium">
          {address.city}, {address.state} - <span className="font-bold">{address.pincode}</span>
        </p>
        <p className="text-slate-600 flex items-center gap-1.5 pt-1">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span>{address.phone}</span>
        </p>
      </div>
    </div>
  );
};
