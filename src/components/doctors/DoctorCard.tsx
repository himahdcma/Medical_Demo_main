import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Doctor } from '../../types';
import { Rating } from '../common/Rating';
import { Button } from '../common/Button';
import { Stethoscope, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { AppointmentModal } from './AppointmentModal';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-card-hover transition-all duration-300 flex flex-col">
        {/* Doctor Header & Image */}
        <div className="p-5 flex gap-4 items-start">
          <div className="relative shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-medical-100 shadow-xs"
            />
            {doctor.availableToday && (
              <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                Available Today
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-2 py-0.5 rounded-md">
              {doctor.department}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1 truncate">
              {doctor.name}
            </h3>
            <p className="text-xs text-slate-600 font-medium line-clamp-1">
              {doctor.specialization}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">{doctor.qualifications}</p>

            <div className="flex items-center gap-3 mt-2">
              <Rating value={doctor.rating} count={doctor.reviewCount} size="sm" />
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-600 font-semibold">
                {doctor.experienceYears} Years Exp.
              </span>
            </div>
          </div>
        </div>

        {/* Info snippet */}
        <div className="px-5 pb-4 text-xs text-slate-500 line-clamp-2">
          {doctor.about}
        </div>

        {/* Footer with fee & booking */}
        <div className="mt-auto px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Consultation Fee</span>
            <span className="text-sm font-extrabold text-slate-900">
              {formatCurrency(doctor.consultationFee)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/doctors/${doctor.id}`}
              className="text-xs font-semibold text-slate-600 hover:text-medical-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Profile
            </Link>
            <Button
              onClick={() => setIsAppointmentModalOpen(true)}
              variant="primary"
              size="sm"
              className="shadow-xs"
            >
              Book OPD Slot
            </Button>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        doctor={doctor}
      />
    </>
  );
};
