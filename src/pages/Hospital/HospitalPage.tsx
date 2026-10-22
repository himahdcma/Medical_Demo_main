import React from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import {
  Building2,
  ShieldCheck,
  Award,
  Stethoscope,
  HeartPulse,
  Clock,
  PhoneCall,
  MapPin,
  CheckCircle2,
  Users,
  Bed,
  Microscope,
  Cross
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const HospitalPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hospital Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Breadcrumb items={[{ label: 'Hospital Campus & Facilities' }]} className="text-slate-400" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Award className="w-4 h-4 text-teal-400" />
            <span>NABH & NABL Accredited Super Specialty Hospital</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
            ApexCare Super Specialty Hospital & Healthcare System
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Delivering tertiary care excellence, robotic surgeries, 24/7 Level-1 trauma critical care, and cutting-edge pharmaceutical dispensing since 2001.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/doctors">
              <Button variant="primary" size="lg">
                Meet Our Doctors
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                Contact Hospital Desk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hospital Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-xl">
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-medical-50 text-medical-600 flex items-center justify-center shrink-0">
              <Bed className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">550+</div>
              <div className="text-xs text-slate-500 font-medium">Critical & Inpatient Beds</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">120+</div>
              <div className="text-xs text-slate-500 font-medium">Consultant Specialists</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">99.4%</div>
              <div className="text-xs text-slate-500 font-medium">Clinical Success Rate</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">24 / 7</div>
              <div className="text-xs text-slate-500 font-medium">Emergency & Pharmacy Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy Department Special Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-medical-50/60 to-teal-50/60 rounded-3xl border border-medical-200/80 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-medical-700 bg-white px-3 py-1 rounded-full border border-medical-200">
                Hospital Pharmacy Operations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Integrated Hospital Pharmacy & Cold-Chain Logistics
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our central dispensary is equipped with automated robotic packaging, cleanroom sterile preparation, and dual-redundancy cold-chain refrigeration units. Every medicine shipped to customers is audited by registered hospital pharmacists.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Continuous 24/7 thermal temperature logging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Direct pharmaceutical manufacturer sourcing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>On-campus pickup counter open 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Clinical pharmacist consultation hotline</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80"
                alt="Hospital Pharmacy Cleanroom"
                className="rounded-3xl shadow-lg border-4 border-white object-cover w-full h-72 sm:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Specialized Hospital Departments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive multi-disciplinary wings under one roof
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Apex Cardiac Sciences',
              desc: 'Cath lab, coronary angioplasty, heart failure clinic, and cardiac surgery ICU.',
              icon: HeartPulse,
            },
            {
              title: 'Neurosciences & Stroke Unit',
              desc: 'Comprehensive neuro-rehab, epilepsy monitoring, and acute stroke response team.',
              icon: Microscope,
            },
            {
              title: 'Endocrinology & Diabetology',
              desc: 'Specialized diabetic foot care, continuous glucose monitoring, and hormonal therapies.',
              icon: Stethoscope,
            },
            {
              title: 'Mother & Child Care (Pediatrics)',
              desc: 'Level-3 NICU, pediatric surgery, developmental assessment, and neonatology.',
              icon: Users,
            },
            {
              title: 'Orthopedics & Joint Replacement',
              desc: 'Robotic joint surgeries, arthroscopy, sports trauma, and spine care unit.',
              icon: Award,
            },
            {
              title: '24/7 Emergency & Critical Care',
              desc: 'Equipped with dedicated trauma resuscitation bays and advanced ALS ambulances.',
              icon: Clock,
            },
          ].map((dept, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center">
                <dept.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{dept.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
