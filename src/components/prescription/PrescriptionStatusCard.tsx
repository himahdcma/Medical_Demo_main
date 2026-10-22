import React from 'react';
import { Prescription } from '../../types';
import { FileText, CheckCircle, Clock, AlertTriangle, XCircle, Info, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';

interface PrescriptionStatusCardProps {
  prescription: Prescription;
  onViewDetails?: () => void;
}

export const PrescriptionStatusCard: React.FC<PrescriptionStatusCardProps> = ({
  prescription,
  onViewDetails,
}) => {
  const getStatusBadge = () => {
    switch (prescription.status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Approved ✓
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Under Review
          </span>
        );
      case 'Requires Clarification':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-800 border border-yellow-200">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
            Requires Clarification
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            Rejected
          </span>
        );
      case 'Uploaded':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-medical-50 text-medical-700 border border-medical-200">
            <Info className="w-3.5 h-3.5 text-medical-600" />
            Uploaded
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-all space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold text-slate-800">
              {prescription.id}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-400">{prescription.uploadedAt}</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-1">
            Patient: {prescription.patientName}
          </h4>
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      {/* Main Info with thumbnail */}
      <div className="flex items-start gap-4">
        <a
          href={prescription.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="w-20 h-24 rounded-xl border border-slate-200 overflow-hidden shrink-0 group relative block bg-slate-50"
        >
          <img
            src={prescription.fileUrl}
            alt={prescription.fileName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </a>

        <div className="flex-1 space-y-2 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">File Attached:</span>
            <span className="font-semibold text-slate-800 break-all">
              {prescription.fileName} ({prescription.fileSize})
            </span>
          </div>

          {prescription.doctorName && (
            <div>
              <span className="text-slate-400 block text-[11px]">Doctor / Department:</span>
              <span className="font-semibold text-slate-700">
                {prescription.doctorName}
              </span>
            </div>
          )}

          {prescription.pharmacistNotes && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-medical-800 block mb-0.5">
                Pharmacist Review Remark:
              </span>
              <p className="text-slate-600 leading-relaxed">
                {prescription.pharmacistNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
