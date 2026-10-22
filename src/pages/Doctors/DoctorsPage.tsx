import React, { useState } from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { DoctorCard } from '../../components/doctors/DoctorCard';
import { DOCTORS } from '../../data/doctors';
import { Stethoscope, Filter, Search, CheckCircle2 } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const departments = [
    'All',
    'Cardiology',
    'Endocrinology',
    'Pediatrics',
    'Orthopedics',
    'General Medicine',
    'Neurology',
  ];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept =
      selectedDept === 'All' || doc.department.toLowerCase() === selectedDept.toLowerCase();
    const matchesToday = onlyAvailableToday ? doc.availableToday : true;
    const matchesSearch =
      searchQuery.trim() === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesToday && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Specialist Doctors & OPD' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded uppercase">
              ApexCare Hospital Faculty
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Consult Top Hospital Doctors
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Board-certified senior consultants available for hospital OPD and clinical prescription renewals
          </p>
        </div>

        {/* Doctor Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search doctor or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDept === dept
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={onlyAvailableToday}
            onChange={(e) => setOnlyAvailableToday(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <span>Available Today Only</span>
        </label>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};
