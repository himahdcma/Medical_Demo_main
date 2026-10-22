import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Pill, FileUp, ClipboardList, User } from 'lucide-react';
import { usePrescriptionStore } from '../../store/usePrescriptionStore';

export const MobileBottomNav: React.FC = () => {
  const prescriptionsCount = usePrescriptionStore((state) => state.prescriptions.length);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-colors ${
              isActive ? 'text-medical-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </NavLink>

        <NavLink
          to="/medicines"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-colors ${
              isActive ? 'text-medical-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <Pill className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Medicines</span>
        </NavLink>

        {/* Highlighted Prescription Upload */}
        <NavLink
          to="/prescriptions/upload"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 -mt-3.5 group`
          }
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-medical-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-medical-200 group-active:scale-95 transition-transform">
            <FileUp className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] font-bold text-teal-800 mt-0.5">Upload Rx</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-colors ${
              isActive ? 'text-medical-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Orders</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 transition-colors ${
              isActive ? 'text-medical-600 font-bold' : 'text-slate-500'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};
