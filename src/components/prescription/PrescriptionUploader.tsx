import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, CheckCircle, X, Trash2, Stethoscope, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { DOCTORS } from '../../data/doctors';
import { usePrescriptionStore } from '../../store/usePrescriptionStore';

interface PrescriptionUploaderProps {
  onSuccess?: (prescriptionId: string) => void;
}

export const PrescriptionUploader: React.FC<PrescriptionUploaderProps> = ({ onSuccess }) => {
  const uploadPrescription = usePrescriptionStore((state) => state.uploadPrescription);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    file: File | null;
    previewUrl: string;
    name: string;
    size: string;
  } | null>(null);

  const [patientName, setPatientName] = useState('Prabhas Gorusu');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Ananya Rao (Cardiology)');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10 MB limit. Please upload a smaller file.');
      return;
    }
    const fileSizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const previewUrl = file.type.startsWith('image/')
      ? URL.createObjectURL(file)
      : 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80';

    setSelectedFile({
      file,
      previewUrl,
      name: file.name,
      size: fileSizeFormatted,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSimulateDefaultFile = () => {
    setSelectedFile({
      file: null,
      previewUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      name: 'Sample_Dr_Prescription_ApexHospital.jpg',
      size: '1.4 MB',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please upload or select a prescription file first.');
      return;
    }

    setIsSubmitting(true);
    let progress = 10;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);

        const newRx = uploadPrescription({
          fileName: selectedFile.name,
          fileUrl: selectedFile.previewUrl,
          fileSize: selectedFile.size,
          patientName,
          doctorName: selectedDoctor,
          notes: additionalNotes,
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
        setSubmittedId(newRx.id);
        if (onSuccess) onSuccess(newRx.id);
      } else {
        setUploadProgress(progress);
      }
    }, 200);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-sm space-y-4 max-w-lg mx-auto animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">
          Prescription Submitted Successfully ✓
        </h3>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Prescription ID:</span>
            <span className="font-mono font-bold text-slate-800">{submittedId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-semibold">Clinical Audit Status:</span>
            <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              ● Under Review
            </span>
          </div>
          <p className="text-slate-600 pt-1 leading-relaxed">
            Our licensed chief clinical pharmacist is auditing your prescription against medication dosage, contraindications, and expiry. We will notify you once approved.
          </p>
        </div>

        <div className="pt-2 flex gap-3 justify-center">
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedFile(null);
              setUploadProgress(0);
            }}
            variant="outline"
            size="sm"
          >
            Upload Another
          </Button>
          <Button
            onClick={() => {
              window.location.href = '/prescriptions';
            }}
            variant="primary"
            size="sm"
          >
            View All Prescriptions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Drag & Drop Zone */}
      <div>
        <label className="text-sm font-bold text-slate-800 block mb-2">
          Upload Doctor's Prescription
        </label>

        {!selectedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-medical-500 bg-medical-50/70 scale-[0.99]'
                : 'border-slate-300 hover:border-medical-400 hover:bg-slate-50/60 bg-slate-50/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <div className="w-16 h-16 rounded-2xl bg-medical-50 text-medical-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-medical-50/50">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h4 className="text-base font-bold text-slate-800 mb-1">
              Drag & drop your prescription here
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              or <span className="text-medical-600 font-bold underline">browse files</span> from your computer or phone
            </p>

            <div className="inline-flex items-center gap-3 text-[11px] text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200">
              <span>Supported: JPG, PNG, PDF</span>
              <span>•</span>
              <span>Max file size: 10 MB</span>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSimulateDefaultFile();
                }}
                className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-200 transition-colors"
              >
                + Or attach sample hospital prescription
              </button>
            </div>
          </div>
        ) : (
          /* File Preview Card */
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedFile.previewUrl}
                alt="Prescription preview"
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-slate-800 truncate">
                  {selectedFile.name}
                </h5>
                <p className="text-[11px] text-slate-400 mt-0.5">{selectedFile.size}</p>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1 inline-block">
                  Ready to submit
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-medical-600 hover:text-medical-800 font-semibold px-2 py-1 rounded hover:bg-slate-200 cursor-pointer"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress Bar if submitting */}
      {isSubmitting && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Uploading & scanning for pharmacist audit...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-medical-600 h-full rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Patient & Doctor Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Patient Full Name *
          </label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Prescribing Doctor / Hospital Department
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none bg-white"
          >
            {DOCTORS.map((d) => (
              <option key={d.id} value={`${d.name} (${d.department})`}>
                {d.name} — {d.department}
              </option>
            ))}
            <option value="External Private Clinic Physician">
              External Private Clinic Physician
            </option>
          </select>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="text-xs">
        <label className="font-semibold text-slate-700 block mb-1">
          Special Notes or Specific Medicine Instructions for Pharmacist
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Please dispense 30 tablets for 1 month supply; patient is allergic to penicillin..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-medical-500 focus:outline-none"
        />
      </div>

      {/* Clinical Guidance Notice */}
      <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-500">
        <AlertCircle className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
        <p>
          Valid prescriptions must contain the Doctor's Registration Number, Patient's Name, Date of Consultation, and Signature/Stamp. Medicines will only be dispensed after verification.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!selectedFile || isSubmitting}
        isLoading={isSubmitting}
        variant="primary"
        size="lg"
        className="w-full shadow-md shadow-medical-200"
      >
        Submit Prescription for Pharmacist Review
      </Button>
    </form>
  );
};
