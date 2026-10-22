import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { Calendar, Clock, MapPin, Stethoscope, CheckCircle2, User, Phone } from 'lucide-react';
import { DOCTORS } from '../../data/doctors';

export const AppointmentsPage: React.FC = () => {
  const sampleAppointments = [
    {
      id: 'APT-882104',
      doctor: DOCTORS[0], // Dr. Ananya Rao
      date: 'Tomorrow, 25 Sep 2026',
      slot: '11:00 AM',
      patientName: 'Prabhas Gorusu',
      status: 'Confirmed',
      room: 'Cardiology Wing, OPD Block B - Room 204',
      fee: 800,
    },
    {
      id: 'APT-661099',
      doctor: DOCTORS[1], // Dr. Vikramaditya Sharma
      date: '02 Oct 2026',
      slot: '03:00 PM',
      patientName: 'Prabhas Gorusu',
      status: 'Confirmed',
      room: 'Endocrine Clinic, Tower 1 - Room 108',
      fee: 750,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Doctor Appointments' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Doctor Appointments ({sampleAppointments.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hospital OPD tokens and consultation schedule at ApexCare Super Specialty Campus
          </p>
        </div>

        <Link to="/doctors">
          <Button variant="primary" size="md">
            + Book New Consultation
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sampleAppointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-xs font-extrabold text-slate-800">
                Token: #{apt.id}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {apt.status}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <img
                src={apt.doctor.image}
                alt={apt.doctor.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-medical-50 shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-bold uppercase text-medical-600 bg-medical-50 px-2 py-0.5 rounded">
                  {apt.doctor.department}
                </span>
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {apt.doctor.name}
                </h3>
                <p className="text-xs text-slate-500">{apt.doctor.specialization}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-medical-600 shrink-0" />
                <span className="font-bold">{apt.date}</span> at <span className="font-bold">{apt.slot}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{apt.room}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Patient: {apt.patientName}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-400">Consultation Fee Paid: ₹{apt.fee}</span>
              <button
                onClick={() => alert(`Appointment #${apt.id} rescheduled request forwarded to OPD desk.`)}
                className="text-medical-600 hover:text-medical-800 font-bold underline cursor-pointer"
              >
                Reschedule Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
