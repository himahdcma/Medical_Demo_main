import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Prescription } from '../types';
import { INITIAL_PRESCRIPTIONS } from '../data/mockData';

interface PrescriptionState {
  prescriptions: Prescription[];
  uploadPrescription: (data: {
    fileName: string;
    fileUrl: string;
    fileSize: string;
    patientName: string;
    doctorName?: string;
    notes?: string;
  }) => Prescription;
  updateStatus: (
    id: string,
    status: Prescription['status'],
    pharmacistNotes?: string
  ) => void;
  getPrescriptionById: (id: string) => Prescription | undefined;
}

export const usePrescriptionStore = create<PrescriptionState>()(
  persist(
    (set, get) => ({
      prescriptions: INITIAL_PRESCRIPTIONS,

      uploadPrescription: (data) => {
        const newPrescription: Prescription = {
          id: `rx-${Date.now().toString().slice(-6)}`,
          fileName: data.fileName,
          fileUrl: data.fileUrl,
          fileSize: data.fileSize,
          uploadedAt: 'Just now',
          patientName: data.patientName,
          doctorName: data.doctorName || 'Consulting Physician',
          status: 'Under Review',
          notes: data.notes,
          pharmacistNotes: 'Assigned to Hospital Pharmacist on duty for clinical audit.',
        };

        set((state) => ({
          prescriptions: [newPrescription, ...state.prescriptions],
        }));

        return newPrescription;
      },

      updateStatus: (id, status, pharmacistNotes) => {
        set((state) => ({
          prescriptions: state.prescriptions.map((rx) =>
            rx.id === id
              ? {
                  ...rx,
                  status,
                  pharmacistNotes: pharmacistNotes || rx.pharmacistNotes,
                }
              : rx
          ),
        }));
      },

      getPrescriptionById: (id) => {
        return get().prescriptions.find((p) => p.id === id);
      },
    }),
    {
      name: 'apexrx-storage-v1',
    }
  )
);
