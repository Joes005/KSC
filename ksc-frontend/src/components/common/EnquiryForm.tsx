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
      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-8 text-center shadow-glow">
        <CheckCircle2 className="mx-auto h-12 w-12 text-secondary" />
        <h3 className="mt-4 text-xl font-bold text-white">Thank you! Request received.</h3>
        <p className="mt-2 text-sm text-white/70">
          Our counsellor will reach out to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6 w-full"
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
        // Premium Dark Theme Input Styling
        const base = "w-full rounded-lg border border-white/10 bg-ksc-navy-dark px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all shadow-inner";
        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white/90">
              {field.label}
              {field.required && <span className="text-secondary ml-1">*</span>}
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
                  <option key={opt} value={opt} className="bg-ksc-navy-dark text-white">
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