import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCMS } from "../../contexts/CMSContext";
import type { Testimonial } from "../../contexts/CMSContext";

export function TestimonialsEditor() {
  const { testimonials, setTestimonials } = useCMS();
  const [items, setItems] = useState<Testimonial[]>(
    testimonials.map((t) => ({ ...t })),
  );
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleSave = () => {
    setTestimonials(items);
    setIsDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    const nextId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : Date.now();
    const newItem: Testimonial = {
      id: nextId,
      quote: "",
      name: "",
      location: "",
      role: "",
    };
    setItems((prev) => [...prev, newItem]);
    setIsDirty(true);
  };

  const updateItem = (id: number, field: keyof Testimonial, value: string) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    );
    setIsDirty(true);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
    setIsDirty(true);
  };

  const inputClass =
    "mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Testimonials</Label>
        <Button size="sm" variant="outline" onClick={addItem}>
          <Plus className="w-3 h-3 mr-1" /> Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((t) => (
          <div
            key={t.id}
            className="border border-border rounded-md p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">
                Testimonial
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive h-6 w-6"
                onClick={() => removeItem(t.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div>
              <label
                htmlFor={`testimonial-quote-${t.id}`}
                className="text-xs text-muted-foreground"
              >
                Quote
              </label>
              <textarea
                id={`testimonial-quote-${t.id}`}
                value={t.quote || ""}
                onChange={(e) => updateItem(t.id, "quote", e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Client quote..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor={`testimonial-name-${t.id}`}
                  className="text-xs text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id={`testimonial-name-${t.id}`}
                  type="text"
                  value={t.name || ""}
                  onChange={(e) => updateItem(t.id, "name", e.target.value)}
                  className={inputClass}
                  placeholder="Client name"
                />
              </div>
              <div>
                <label
                  htmlFor={`testimonial-location-${t.id}`}
                  className="text-xs text-muted-foreground"
                >
                  Location
                </label>
                <input
                  id={`testimonial-location-${t.id}`}
                  type="text"
                  value={t.location || ""}
                  onChange={(e) => updateItem(t.id, "location", e.target.value)}
                  className={inputClass}
                  placeholder="City, State"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor={`testimonial-role-${t.id}`}
                className="text-xs text-muted-foreground"
              >
                Role (optional)
              </label>
              <input
                id={`testimonial-role-${t.id}`}
                type="text"
                value={t.role || ""}
                onChange={(e) => updateItem(t.id, "role", e.target.value)}
                className={inputClass}
                placeholder="Role (optional)"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {isDirty && (
          <span className="text-xs text-amber-600 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            Unsaved changes
          </span>
        )}
        <Button
          onClick={handleSave}
          data-ocid="testimonials.save_button"
          className="bg-gold hover:bg-gold/90 text-white"
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Saved!
            </span>
          ) : (
            "Save Testimonials"
          )}
        </Button>
      </div>
    </div>
  );
}

export default TestimonialsEditor;
