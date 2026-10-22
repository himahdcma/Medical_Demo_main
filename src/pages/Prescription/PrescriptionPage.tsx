import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { PrescriptionStatusCard } from '../../components/prescription/PrescriptionStatusCard';
import { usePrescriptionStore } from '../../store/usePrescriptionStore';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { FileUp, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const PrescriptionPage: React.FC = () => {
  const { prescriptions } = usePrescriptionStore();
  const [statusFilter, setStatusFilter] = useState<'All' | 'Under Review' | 'Approved' | 'Requires Clarification' | 'Rejected'>('All');

  const filtered = prescriptions.filter((p) => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Prescriptions' }]} />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Prescriptions ({prescriptions.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor review statuses, physician notes, and pharmacist dispensing approvals
          </p>
        </div>

        <Link to="/prescriptions/upload">
          <Button variant="primary" size="md" className="flex items-center gap-2 shadow-xs">
            <FileUp className="w-4 h-4" />
            <span>Upload New Prescription</span>
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {(['All', 'Approved', 'Under Review', 'Requires Clarification', 'Rejected'] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Prescription List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No prescriptions in this category"
          description="Upload your medical slip to get it verified by hospital clinical pharmacists."
          actionText="Upload Prescription"
          onAction={() => (window.location.href = '/prescriptions/upload')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((prescription) => (
            <PrescriptionStatusCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </div>
      )}
    </div>
  );
};
