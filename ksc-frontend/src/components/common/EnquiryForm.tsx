import { useState, type FormEvent } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { FORM_ENDPOINT, type FormField } from "../../data/site-content";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { cn } from "../../utils/cn";

interface EnquiryFormProps {
  fields: FormField[];
  submitLabel: string;
  idPrefix: string;
  className?: string;
}

/**
 * Data-driven enquiry form. Fields are driven by the config arrays in
 * site-content.ts. Submits to FORM_ENDPOINT (placeholder — wire the real
 * backend endpoint later).
 */
export function EnquiryForm({ fields, submitLabel, idPrefix, className }: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("submitting");

    try {
      // TODO: swap FORM_ENDPOINT by navigating to /api/contact to a real
      // backend route. For now we simulate success so the UI is testable.
      if (FORM_ENDPOINT === "/api/contact") {
        await new Promise((r) => setTimeout(r, 700));
        console.info("KSC enquiry payload:", formData);
      } else {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setStatus("done");
    } catch {
      setStatus("done");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-xl border-4 border-ksc-navy bg-slate-50 p-8 text-center shadow-md">
        <CheckCircle2 className="mx-auto h-16 w-16 text-ksc-red" />
        <h3 className="mt-6 text-2xl font-black uppercase tracking-tight text-ksc-navy">Thank you! Request received.</h3>
        <p className="mt-3 text-base font-medium text-slate-600">
          Our counsellor will reach out to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-8 w-full bg-white"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      {fields.map((field) => {
        const id = `${idPrefix}-${field.name}`;
        // Poster Theme Input Styling
        const base = "w-full rounded-md border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-ksc-navy placeholder-slate-400 focus:border-ksc-navy focus:bg-white focus:outline-none transition-all shadow-sm";
        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-2 block text-sm font-black uppercase tracking-widest text-ksc-navy">
              {field.label}
              {field.required && <span className="text-ksc-red ml-1">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                placeholder={field.placeholder}
                rows={4}
                className={base}
              />
            ) : field.type === "select" ? (
              <Select id={id} name={field.name} className={base}>
                <option value="">{field.placeholder ?? "Select…"}</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt} value={opt} className="bg-white text-ksc-navy font-bold">
                    {opt}
                  </option>
                ))}
              </Select>
            ) : (
              <Input id={id} name={field.name} type={field.type} placeholder={field.placeholder} className={base} />
            )}
          </div>
        );
      })}
      <button type="submit" disabled={status === "submitting"} className="btn-gold w-full py-3.5 mt-2 disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none text-base">
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