import { atom } from "jotai";

interface FormState {
  from_name: string;
  reply_to: string;
  subject: string;
  message: string;
  to_email: string;
}

export const formStateAtom = atom<FormState>({
  from_name: "",
  reply_to: "",
  subject: "",
  message: "",
  to_email: "your-email@example.com", // Replace with your actual email
});

export const isLoadingAtom = atom(false);
