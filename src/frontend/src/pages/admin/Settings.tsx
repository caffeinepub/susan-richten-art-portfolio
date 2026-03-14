import { ExternalLink, Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import {
  type SEOSettings,
  type SiteSettings,
  useCMS,
} from "../../contexts/CMSContext";

const SEO_PAGES = [
  "home",
  "gallery",
  "commissions",
  "about",
  "contact",
  "testimonials",
];

export default function Settings() {
  const { siteSettings, updateSiteSettings } = useCMS();
  const { changePassword } = useAuth();
  const [form, setForm] = useState<SiteSettings>({ ...siteSettings });

  // Per-section dirty tracking
  const [generalDirty, setGeneralDirty] = useState(false);
  const [generalSaved, setGeneralSaved] = useState(false);
  const [socialDirty, setSocialDirty] = useState(false);
  const [socialSaved, setSocialSaved] = useState(false);
  const [seoDirty, setSeoDirty] = useState(false);
  const [seoSaved, setSeoSaved] = useState(false);

  // Change password form state
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveGeneral = () => {
    updateSiteSettings({
      siteTitle: form.siteTitle,
      siteTagline: form.siteTagline,
      googleAnalyticsId: form.googleAnalyticsId,
      newsletterPlaceholder: form.newsletterPlaceholder,
    });
    setGeneralDirty(false);
    setGeneralSaved(true);
    toast.success("General settings saved");
    setTimeout(() => setGeneralSaved(false), 2000);
  };

  const handleSaveSocial = () => {
    updateSiteSettings({ socialPlatforms: form.socialPlatforms });
    setSocialDirty(false);
    setSocialSaved(true);
    toast.success("Social media settings saved");
    setTimeout(() => setSocialSaved(false), 2000);
  };

  const handleSaveSeo = () => {
    updateSiteSettings({ seoSettings: form.seoSettings });
    setSeoDirty(false);
    setSeoSaved(true);
    toast.success("SEO settings saved");
    setTimeout(() => setSeoSaved(false), 2000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (!pwForm.current) {
      setPwError("Please enter your current password.");
      return;
    }
    if (!pwForm.newPw) {
      setPwError("Please enter a new password.");
      return;
    }
    if (pwForm.newPw.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (pwForm.newPw !== pwForm.confirm) {
      setPwError("New password and confirmation do not match.");
      return;
    }

    const result = changePassword(pwForm.current, pwForm.newPw);
    if (result.success) {
      setPwSuccess("Password updated successfully");
      setPwForm({ current: "", newPw: "", confirm: "" });
    } else {
      setPwError(result.error || "Failed to update password.");
    }
  };

  const inputClass =
    "w-full px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors";

  function getSeoEntry(page: string): SEOSettings {
    return (
      form.seoSettings.find((s) => s.page === page) ?? {
        page,
        title: "",
        description: "",
        keywords: "",
      }
    );
  }

  function updateSeoEntry(
    page: string,
    field: keyof Omit<SEOSettings, "page">,
    value: string,
  ) {
    setForm((f) => {
      const existing = f.seoSettings.find((s) => s.page === page);
      if (existing) {
        return {
          ...f,
          seoSettings: f.seoSettings.map((s) =>
            s.page === page ? { ...s, [field]: value } : s,
          ),
        };
      }
      return {
        ...f,
        seoSettings: [
          ...f.seoSettings,
          { page, title: "", description: "", keywords: "", [field]: value },
        ],
      };
    });
    setSeoDirty(true);
  }

  function getSocialUrl(icon: string): string {
    return (
      form.socialPlatforms.find(
        (p) => p.icon === icon || p.name.toLowerCase() === icon,
      )?.url || ""
    );
  }

  function setSocialUrl(icon: string, url: string) {
    setForm((f) => {
      const exists = f.socialPlatforms.find(
        (p) => p.icon === icon || p.name.toLowerCase() === icon,
      );
      if (exists) {
        return {
          ...f,
          socialPlatforms: f.socialPlatforms.map((p) =>
            p.icon === icon || p.name.toLowerCase() === icon
              ? { ...p, url }
              : p,
          ),
        };
      }
      const nameMap: Record<string, string> = {
        instagram: "Instagram",
        facebook: "Facebook",
        pinterest: "Pinterest",
      };
      return {
        ...f,
        socialPlatforms: [
          ...f.socialPlatforms,
          { name: nameMap[icon] || icon, url, icon },
        ],
      };
    });
    setSocialDirty(true);
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl text-charcoal mb-1">Settings</h1>
          <p className="font-body text-sm text-charcoal-muted">
            Site-wide configuration
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.open("/", "_blank")}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-beige font-body text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors shrink-0"
        >
          <ExternalLink size={14} />
          Preview Site
        </button>
      </div>

      <div className="space-y-8 max-w-3xl">
        {/* General */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="settings-site-title"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Site Title
              </label>
              <input
                id="settings-site-title"
                type="text"
                value={form.siteTitle}
                onChange={(e) => {
                  setForm((f) => ({ ...f, siteTitle: e.target.value }));
                  setGeneralDirty(true);
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="settings-site-tagline"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Site Tagline
              </label>
              <input
                id="settings-site-tagline"
                type="text"
                value={form.siteTagline}
                onChange={(e) => {
                  setForm((f) => ({ ...f, siteTagline: e.target.value }));
                  setGeneralDirty(true);
                }}
                className={inputClass}
                placeholder="Artist tagline"
              />
            </div>
            <div>
              <label
                htmlFor="settings-ga-id"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Google Analytics ID
              </label>
              <input
                id="settings-ga-id"
                type="text"
                value={form.googleAnalyticsId}
                onChange={(e) => {
                  setForm((f) => ({ ...f, googleAnalyticsId: e.target.value }));
                  setGeneralDirty(true);
                }}
                className={inputClass}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div>
              <label
                htmlFor="settings-newsletter-placeholder"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Newsletter Placeholder Text
              </label>
              <input
                id="settings-newsletter-placeholder"
                type="text"
                value={form.newsletterPlaceholder}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    newsletterPlaceholder: e.target.value,
                  }));
                  setGeneralDirty(true);
                }}
                className={inputClass}
                placeholder="Enter your email for studio updates"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4 mt-2 border-t border-beige-dark">
            {generalDirty && (
              <span className="text-xs text-amber-600 font-body flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                Unsaved changes
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveGeneral}
              data-ocid="settings.general.save_button"
              className="px-8 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              {generalSaved ? "Saved!" : "Save General"}
            </button>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-4">
            Social Media
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="settings-instagram-url"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Instagram URL
              </label>
              <input
                id="settings-instagram-url"
                type="url"
                value={getSocialUrl("instagram")}
                onChange={(e) => setSocialUrl("instagram", e.target.value)}
                className={inputClass}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label
                htmlFor="settings-facebook-url"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Facebook URL
              </label>
              <input
                id="settings-facebook-url"
                type="url"
                value={getSocialUrl("facebook")}
                onChange={(e) => setSocialUrl("facebook", e.target.value)}
                className={inputClass}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label
                htmlFor="settings-pinterest-url"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Pinterest URL
              </label>
              <input
                id="settings-pinterest-url"
                type="url"
                value={getSocialUrl("pinterest")}
                onChange={(e) => setSocialUrl("pinterest", e.target.value)}
                className={inputClass}
                placeholder="https://pinterest.com/..."
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4 mt-2 border-t border-beige-dark">
            {socialDirty && (
              <span className="text-xs text-amber-600 font-body flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                Unsaved changes
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveSocial}
              data-ocid="settings.social.save_button"
              className="px-8 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              {socialSaved ? "Saved!" : "Save Social Media"}
            </button>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-4">
            SEO — Per Page
          </h2>
          <div className="space-y-6">
            {SEO_PAGES.map((page) => {
              const entry = getSeoEntry(page);
              return (
                <div key={page}>
                  <h3 className="font-body text-xs tracking-widest uppercase text-charcoal-muted mb-2">
                    {page}
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) =>
                        updateSeoEntry(page, "title", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Meta title"
                    />
                    <textarea
                      value={entry.description}
                      onChange={(e) =>
                        updateSeoEntry(page, "description", e.target.value)
                      }
                      rows={2}
                      className={inputClass}
                      placeholder="Meta description"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 pt-4 mt-4 border-t border-beige-dark">
            {seoDirty && (
              <span className="text-xs text-amber-600 font-body flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                Unsaved changes
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveSeo}
              data-ocid="settings.seo.save_button"
              className="px-8 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              {seoSaved ? "Saved!" : "Save SEO Settings"}
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-1">
            Change Password
          </h2>
          <p className="font-body text-sm text-charcoal-muted mb-4">
            Update your admin panel password.
          </p>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label
                htmlFor="settings-current-password"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="settings-current-password"
                  type={showCurrent ? "text" : "password"}
                  value={pwForm.current}
                  onChange={(e) => {
                    setPwForm((f) => ({ ...f, current: e.target.value }));
                    setPwError("");
                    setPwSuccess("");
                  }}
                  className={`${inputClass} pr-10`}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal transition-colors"
                  tabIndex={-1}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="settings-new-password"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="settings-new-password"
                  type={showNew ? "text" : "password"}
                  value={pwForm.newPw}
                  onChange={(e) => {
                    setPwForm((f) => ({ ...f, newPw: e.target.value }));
                    setPwError("");
                    setPwSuccess("");
                  }}
                  className={`${inputClass} pr-10`}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal transition-colors"
                  tabIndex={-1}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="settings-confirm-password"
                className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="settings-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={pwForm.confirm}
                  onChange={(e) => {
                    setPwForm((f) => ({ ...f, confirm: e.target.value }));
                    setPwError("");
                    setPwSuccess("");
                  }}
                  className={`${inputClass} pr-10`}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {pwError && (
              <p className="font-body text-sm text-red-500">{pwError}</p>
            )}
            {pwSuccess && (
              <p className="font-body text-sm text-green-600">{pwSuccess}</p>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
