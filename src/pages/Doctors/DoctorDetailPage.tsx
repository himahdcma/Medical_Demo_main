import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { DOCTORS } from '../../data/doctors';
import { Rating } from '../../components/common/Rating';
import { Button } from '../../components/common/Button';
import { AppointmentModal } from '../../components/doctors/AppointmentModal';
import { formatCurrency } from '../../utils/formatters';
import {
  Stethoscope,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Doctors', href: '/doctors' },
          { label: doctor.name },
        ]}
      />

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-medical-50 shadow-md shrink-0"
          />

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-2.5 py-0.5 rounded-md">
                {doctor.department}
              </span>
              {doctor.availableToday && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ● Available Today
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {doctor.name}
            </h1>

            <p className="text-sm font-semibold text-slate-700">
              {doctor.specialization}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>{doctor.qualifications}</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <Rating value={doctor.rating} count={doctor.reviewCount} size="md" />
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-slate-700">
                {doctor.experienceYears} Years Clinical Experience
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center min-w-[200px] space-y-3 w-full sm:w-auto">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block">OPD Consultation Fee</span>
              <span className="text-2xl font-extrabold text-slate-900">
                {formatCurrency(doctor.consultationFee)}
              </span>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="md"
              className="w-full shadow-md shadow-medical-200"
            >
              Book OPD Slot
            </Button>
          </div>
        </div>

        {/* Doctor OPD Location & Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-medical-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-bold mb-0.5">Hospital Location</strong>
              <p className="text-slate-600">{doctor.hospitalRoom}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 flex items-start gap-3">
            <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-bold mb-0.5">OPD Timings</strong>
              <p className="text-slate-600">Morning 09:00 AM - 01:00 PM | Evening 04:00 PM - 07:30 PM</p>
            </div>
          </div>
        </div>

        {/* Clinical Bio & Expertise */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900">About the Doctor</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {doctor.about}
          </p>
        </div>

        {/* Available slots preview */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Available Consultation Slots</h3>
          <div className="flex flex-wrap gap-2">
            {doctor.availableSlots.map((slot) => (
              <span
                key={slot}
                className="px-3 py-1.5 rounded-xl bg-medical-50 text-medical-800 text-xs font-bold border border-medical-200"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={doctor}
      />
    </div>
  );
};
