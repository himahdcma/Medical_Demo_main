import React from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { PrescriptionUploader } from '../../components/prescription/PrescriptionUploader';
import { ShieldCheck, Clock, CheckCircle2, AlertCircle, FileText, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UploadPrescriptionPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Prescriptions', href: '/prescriptions' },
          { label: 'Upload Prescription' },
        ]}
      />

      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
          <Stethoscope className="w-4 h-4 text-teal-600" />
          <span>Licensed Hospital Clinical Pharmacy</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload Your Medical Prescription
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Upload your doctor's slip. Our certified pharmacists will review the medicine brands, verify therapeutic safety, and coordinate delivery.
        </p>
      </div>

      {/* 3 Step Explanation Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center space-y-1 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-medical-50 text-medical-600 font-bold flex items-center justify-center mx-auto text-xs">
            1
          </div>
          <h4 className="text-xs font-bold text-slate-800">Upload Doctor's Slip</h4>
          <p className="text-[11px] text-slate-400">Photo or PDF up to 10 MB</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center space-y-1 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 font-bold flex items-center justify-center mx-auto text-xs">
            2
          </div>
          <h4 className="text-xs font-bold text-slate-800">Pharmacist Audit</h4>
          <p className="text-[11px] text-slate-400">Verified in 15 - 30 minutes</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center space-y-1 shadow-2xs">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center mx-auto text-xs">
            3
          </div>
          <h4 className="text-xs font-bold text-slate-800">Doorstep Delivery</h4>
          <p className="text-[11px] text-slate-400">Packed in sterile cold-chain</p>
        </div>
      </div>

      {/* The Upload Form */}
      <PrescriptionUploader />

      {/* Guidelines Box */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4 text-xs">
        <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-medical-600" />
          Guidelines for Valid Prescription Upload
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Ensure the Doctor's Name, Degree, and Medical Council Reg. No. are clearly visible.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Prescription date must be legible and within validity duration (usually 6 months).</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Avoid cropped photos; include patient name and full dosage schedule.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Ensure handwriting is adequately illuminated and not blurry.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
