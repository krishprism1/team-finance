import { create } from 'zustand';

interface FormState {
  step: number;
  setStep: (step: number) => void;
}

const useFormStore = create<FormState>((set) => ({
  step: 0,
  formData: {},
  setStep: (step) => set({ step: step })
}));

export default useFormStore;
