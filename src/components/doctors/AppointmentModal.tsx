import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Doctor } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Calendar, Clock, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  doctor,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(doctor.availableSlots[0] || '10:00 AM');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 25 Sep 2026');
  const [patientName, setPatientName] = useState('Prabhas Gorusu');
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');
  const [reason, setReason] = useState('Routine consultation & medicine prescription renewal');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingRef(`APT-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsBooked(true);
  };

  const handleResetAndClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isBooked ? 'Appointment Confirmed ✓' : 'Book OPD Consultation'}
      description={
        isBooked
          ? 'Your hospital OPD booking token is generated'
          : `Consult with ${doctor.name} at ApexCare Hospital Campus`
      }
      maxWidth="md"
    >
      {isBooked ? (
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">Appointment Token:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{bookingRef}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Doctor:</span>
              <span className="font-bold text-slate-800">{doctor.name} ({doctor.department})</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Slot & Date:</span>
              <span className="font-bold text-slate-800">{selectedDate} at {selectedSlot}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Hospital Room:</span>
              <span className="font-bold text-medical-700">{doctor.hospitalRoom}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Patient Name:</span>
              <span className="font-bold text-slate-800">{patientName}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Please report at the hospital OPD reception 15 minutes before your scheduled slot. An SMS confirmation has been sent to {patientPhone}.
          </p>

          <Button onClick={handleResetAndClose} variant="primary" className="w-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="space-y-4 text-xs">
          {/* Doctor Brief Card */}
          <div className="p-3 bg-medical-50/50 rounded-xl border border-medical-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-11 h-11 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-slate-900">{doctor.name}</h4>
                <p className="text-[11px] text-slate-500">{doctor.department} • Room {doctor.hospitalRoom.split('Room')[1] || '204'}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Fee</span>
              <span className="font-extrabold text-slate-900">{formatCurrency(doctor.consultationFee)}</span>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-medical-600" /> Select Consultation Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Today, 24 Sep', 'Tomorrow, 25 Sep'].map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setSelectedDate(d)}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                    selectedDate.includes(d)
                      ? 'border-medical-600 bg-medical-50 text-medical-800'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Selection */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-medical-600" /> Available OPD Time Slots
            </label>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition-all ${
                      isSelected
                        ? 'border-medical-600 bg-medical-600 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Patient Name</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mobile Phone</label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Reason / Symptoms</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full shadow-md shadow-medical-200">
              Confirm & Book OPD Appointment ({formatCurrency(doctor.consultationFee)})
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
