import { useSearch } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useCMS } from "../contexts/CMSContext";

const PROJECT_TYPES = [
  "Portrait",
  "Landscape",
  "Seascape",
  "Still Life",
  "Abstract",
  "Other",
];
const BUDGET_RANGES = [
  "$800–$1,500",
  "$1,500–$3,000",
  "$3,000–$5,000",
  "$5,000–$8,000",
  "$8,000+",
];
const TIMELINES = [
  "1–2 months",
  "2–3 months",
  "3–6 months",
  "6+ months",
  "Flexible",
];
const SIZES = [
  'Small (up to 12")',
  'Medium (12"–24")',
  'Large (24"–36")',
  'Extra Large (36"+)',
  "Custom",
];

export default function CommissionInquiryForm() {
  const { addCommissionInquiry, addNotification } = useCMS();
  const search = useSearch({ strict: false }) as Record<string, string>;
  const artworkParam = search?.artwork || "";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    size: "",
    location: "",
    budgetRange: "",
    timeline: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (artworkParam) {
      setForm((prev) => ({
        ...prev,
        description: `I am interested in a commission inspired by "${artworkParam}". `,
      }));
    }
  }, [artworkParam]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.projectType) errs.projectType = "Please select a project type";
    return errs;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.budgetRange) errs.budgetRange = "Please select a budget range";
    if (!form.description.trim())
      errs.description = "Please describe your project";
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addCommissionInquiry({
      name: form.name,
      email: form.email,
      projectType: form.projectType,
      budgetRange: form.budgetRange,
      budget: form.budgetRange,
      description: form.description,
      projectDescription: form.description,
    });
    const preview = `${form.projectType} · ${form.budgetRange}${form.timeline ? ` · ${form.timeline}` : ""} — ${form.description.slice(0, 80)}`;
    addNotification({
      sourceType: "commission",
      submitterName: form.name,
      submitterEmail: form.email,
      messagePreview: preview.slice(0, 100),
      fullPayload: `Name: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}${form.location ? `\nLocation: ${form.location}` : ""}\nProject Type: ${form.projectType}${form.size ? `\nSize: ${form.size}` : ""}\nBudget: ${form.budgetRange}${form.timeline ? `\nTimeline: ${form.timeline}` : ""}\n\nDescription:\n${form.description}`,
      status: "unread",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-charcoal font-medium text-lg">Inquiry submitted!</p>
        <p className="text-sm text-charcoal-muted mt-2">
          Thank you for your interest. I'll review your project and be in touch
          within 24–48 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-beige-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors";

  return (
    <div>
      {/* Step Progress Indicator */}
      <div className="flex items-center mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-semibold transition-colors ${
                  step >= s
                    ? "bg-charcoal text-beige"
                    : "bg-beige-dark text-charcoal-muted border border-beige-dark"
                }`}
              >
                {s}
              </div>
              <span
                className={`font-body text-xs tracking-wide hidden sm:block ${step >= s ? "text-charcoal" : "text-charcoal-muted"}`}
              >
                {s === 1 ? "Your Details" : "Project Info"}
              </span>
            </div>
            {s < 2 && (
              <div
                className={`flex-1 h-px mx-3 ${step > s ? "bg-gold" : "bg-beige-dark"}`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="commission-name"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Name *
                </label>
                <input
                  id="commission-name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="commission-email"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Email *
                </label>
                <input
                  id="commission-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="commission-phone"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Phone (optional)
                </label>
                <input
                  id="commission-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="commission-location"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Location (optional)
                </label>
                <input
                  id="commission-location"
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  className={inputClass}
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="commission-project-type"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Project Type *
                </label>
                <select
                  id="commission-project-type"
                  value={form.projectType}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, projectType: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">Select a type...</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.projectType}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="commission-size"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Preferred Size
                </label>
                <select
                  id="commission-size"
                  value={form.size}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, size: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">Select a size...</option>
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              Next: Project Details →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="commission-budget"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Budget Range *
                </label>
                <select
                  id="commission-budget"
                  value={form.budgetRange}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, budgetRange: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">Select a range...</option>
                  {BUDGET_RANGES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.budgetRange && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.budgetRange}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="commission-timeline"
                  className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
                >
                  Timeline
                </label>
                <select
                  id="commission-timeline"
                  value={form.timeline}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, timeline: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">Select a timeline...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="commission-description"
                className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Project Description *
              </label>
              <textarea
                id="commission-description"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Describe your vision, subject matter, intended location, and any specific requirements..."
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Response time notice */}
            <div className="flex items-center gap-2 py-3 px-4 bg-gold/10 border border-gold/30">
              <Clock size={16} className="text-gold shrink-0" />
              <p className="font-body text-sm text-charcoal">
                We typically respond within <strong>24–48 hours</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setErrors({});
                }}
                className="flex-1 py-3 border border-charcoal text-charcoal font-body text-sm tracking-widest uppercase hover:bg-beige-dark transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
              >
                Submit Inquiry
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
