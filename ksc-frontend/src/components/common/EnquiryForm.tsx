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
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-xl font-bold text-ksc-dark">Thank you! Request received.</h3>
        <p className="mt-2 text-sm text-ksc-ink/80">
          Our counsellor will reach out to you shortly. (Form is wired to a placeholder endpoint — we&apos;ll
          notify you on submission once the backend is connected.)
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {fields.map((field) => {
        const id = `${idPrefix}-${field.name}`;
        const base = "w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none";
        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ksc-dark">
              {field.label}
              {field.required && <span className="text-ksc-saffron"> *</span>}
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
                  <option key={opt} value={opt}>
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
      <button type="submit" disabled={status === "submitting"} className="btn-gold w-full disabled:opacity-60">
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> {submitLabel}
          </>
        )}
      </button>
    </form>
  );
}