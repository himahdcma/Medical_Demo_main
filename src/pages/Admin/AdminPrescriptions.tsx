import React, { useState } from 'react';
import { usePrescriptionStore } from '../../store/usePrescriptionStore';
import { Prescription } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  Clock,
  Send
} from 'lucide-react';

export const AdminPrescriptions: React.FC = () => {
  const { prescriptions, updateStatus } = usePrescriptionStore();
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null);
  const [pharmacistRemark, setPharmacistRemark] = useState('');

  const handleOpenAuditModal = (rx: Prescription) => {
    setSelectedRx(rx);
    setPharmacistRemark(rx.pharmacistNotes || '');
  };

  const handleAction = (status: Prescription['status']) => {
    if (!selectedRx) return;
    const remark =
      pharmacistRemark.trim() ||
      (status === 'Approved'
        ? 'Verified & approved by Chief Pharmacist S. Varma (AP-PH-8842).'
        : status === 'Rejected'
        ? 'Invalid prescription: Doctor registration or dosage details missing.'
        : 'Please upload a clearer clinic invoice showing the doctor stamp.');

    updateStatus(selectedRx.id, status, remark);
    setSelectedRx(null);
    alert(`Prescription #${selectedRx.id} marked as ${status}.`);
  };

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-slate-200">
        <span className="text-xs font-bold uppercase text-teal-600 tracking-wider">
          Pharmacist Inspection Hub
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Prescription Audit & Clinical Review Queue ({prescriptions.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review uploaded doctor slips against clinical protocols before dispensing Schedule H medications
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Prescription ID</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Uploaded Date</th>
                <th className="py-3.5 px-4">Doctor / Specialty</th>
                <th className="py-3.5 px-4">Audit Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {rx.id}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800 block">{rx.patientName}</span>
                    <span className="text-[10px] text-slate-400">{rx.fileName}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{rx.uploadedAt}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    {rx.doctorName || 'Consulting Physician'}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        rx.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : rx.status === 'Under Review'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : rx.status === 'Requires Clarification'
                          ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {rx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      onClick={() => handleOpenAuditModal(rx)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Audit Rx →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedRx && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRx(null)}
          title={`Clinical Audit: Prescription #${selectedRx.id}`}
          description={`Uploaded by ${selectedRx.patientName} on ${selectedRx.uploadedAt}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs">
            {/* Split: Preview & Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Image Preview */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 max-h-72">
                <img
                  src={selectedRx.fileUrl}
                  alt={selectedRx.fileName}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Data & Patient remarks */}
              <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Patient Legal Name</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedRx.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Doctor on Slip</span>
                  <span className="font-semibold text-slate-800">{selectedRx.doctorName}</span>
                </div>
                {selectedRx.notes && (
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">Patient Notes</span>
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                      {selectedRx.notes}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">File Size</span>
                  <span className="font-mono text-slate-600">{selectedRx.fileName} ({selectedRx.fileSize})</span>
                </div>
              </div>
            </div>

            {/* Pharmacist Remarks Input */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Clinical Pharmacist Audit Remark / Recommendation *
              </label>
              <textarea
                rows={3}
                value={pharmacistRemark}
                onChange={(e) => setPharmacistRemark(e.target.value)}
                placeholder="Enter remarks (e.g. Verified dosage 500mg, no contraindications with patient records)..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRx(null)}
              >
                Close
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleAction('Rejected')}
                  variant="danger"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </Button>

                <Button
                  onClick={() => handleAction('Requires Clarification')}
                  variant="outline"
                  size="sm"
                  className="border-yellow-300 text-yellow-800 hover:bg-yellow-50 flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" /> Request Clarification
                </Button>

                <Button
                  onClick={() => handleAction('Approved')}
                  variant="teal"
                  size="sm"
                  className="flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Dispense
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
