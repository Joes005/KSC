import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";
import { FORM_ENDPOINT, type FormField } from "../../data/site-content";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { cn } from "../../utils/cn";

interface EnquiryFormProps {
  fields: FormField[];
  submitLabel: string;
  idPrefix: string;
  className?: string;
  formType?: "contact" | "admissions";
}

const API_URL = import.meta.env.VITE_BACKEND_URL ?? "";

/**
 * Data-driven enquiry form. Fields are driven by the config arrays in
 * site-content.ts. Submits to the backend enquiries endpoint, which stores
 * the submission for the admin to see under Enquiries in the admin panel.
 */
export function EnquiryForm({ fields, submitLabel, idPrefix, className, formType = "contact" }: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("submitting");

    try {
      const response = await fetch(`${API_URL}${FORM_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, form_type: formType }),
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

    if (status === "done") {
    return (
      <div className="glass-panel p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-16 w-16 text-ksc-red" />
        <h3 className="mt-6 text-2xl font-black uppercase tracking-tight text-ksc-navy">Thank you! Request received.</h3>
        <p className="mt-3 text-base font-medium text-slate-600">
          Our counsellor will reach out to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-8 w-full"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-ksc-red">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>Something went wrong sending your request. Please try again, or contact us directly by phone/WhatsApp.</span>
        </div>
      )}
      {fields.map((field) => {
        const id = `${idPrefix}-${field.name}`;
        // Poster Theme Input Styling
        const base = "w-full rounded-xl border border-slate-200/60 bg-white/60 px-4 py-3 text-sm font-bold text-ksc-navy placeholder-slate-400 focus:border-ksc-royal/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ksc-royal/20 transition-all shadow-inner";
        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-2 block text-sm font-black uppercase tracking-widest text-ksc-navy">
              {field.label}
              {field.required && <span className="ml-1 text-ksc-red" aria-hidden="true">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                placeholder={field.placeholder}
                rows={4}
                required={field.required}
                className={base}
              />
            ) : field.type === "select" ? (
              <Select id={id} name={field.name} required={field.required} className={base}>
                <option value="">{field.placeholder ?? "Select…"}</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt} value={opt} className="bg-white text-ksc-navy font-bold">
                    {opt}
                  </option>
                ))}
              </Select>
            ) : (
              <Input id={id} name={field.name} type={field.type} required={field.required} placeholder={field.placeholder} className={base} />
            )}
          </div>
        );
      })}
      <p className="text-xs text-slate-500"><span className="text-ksc-red" aria-hidden="true">*</span> Required fields</p>
      <button type="submit" disabled={status === "submitting"} className="btn-gold mt-2 w-full py-3.5 text-base disabled:opacity-60 btn-shimmer" aria-live="polite">
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" /> {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}
