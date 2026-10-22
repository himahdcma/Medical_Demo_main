import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { MapPin, Check } from 'lucide-react';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_LOCATIONS = [
  { city: 'Kakinada', pincode: '533001', area: 'Main Hospital Hub, Ramanayyapeta' },
  { city: 'Visakhapatnam', pincode: '530002', area: 'Health City, Arilova' },
  { city: 'Rajahmundry', pincode: '533101', area: 'Danavaipeta / Main Road' },
  { city: 'Vijayawada', pincode: '520002', area: 'Suryaraopeta Hospital Zone' },
  { city: 'Hyderabad', pincode: '500034', area: 'Banjara Hills / Jubilee Hills' },
  { city: 'Bengaluru', pincode: '560029', area: 'Hosur Road / Koramangala' },
];

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { selectedLocation, setLocation } = useAuthStore();
  const [customPincode, setCustomPincode] = useState('');
  const [customCity, setCustomCity] = useState('');

  const handleSelect = (city: string, pincode: string) => {
    setLocation(city, pincode);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPincode.trim().length === 6 && customCity.trim()) {
      setLocation(customCity.trim(), customPincode.trim());
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Your Delivery Location"
      description="Hospital pharmacy delivery speed and inventory depends on your location"
    >
      <div className="space-y-4">
        {/* Search custom pincode */}
        <form onSubmit={handleCustomSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Enter Pincode
              </label>
              <input
                type="text"
                placeholder="e.g. 533001"
                maxLength={6}
                value={customPincode}
                onChange={(e) => setCustomPincode(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                City / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Kakinada"
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="w-full"
            disabled={customPincode.length !== 6 || !customCity}
          >
            Apply Custom Location
          </Button>
        </form>

        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Popular Hospital Delivery Zones
          </span>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {POPULAR_LOCATIONS.map((loc) => {
              const isSelected =
                selectedLocation.pincode === loc.pincode &&
                selectedLocation.city === loc.city;
              return (
                <button
                  key={loc.pincode}
                  onClick={() => handleSelect(loc.city, loc.pincode)}
                  className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'border-medical-500 bg-medical-50/50 text-medical-900'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-medical-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-sm font-bold flex items-center gap-2">
                        {loc.city} <span className="text-xs font-normal text-slate-500">({loc.pincode})</span>
                      </div>
                      <div className="text-xs text-slate-400">{loc.area}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-medical-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
