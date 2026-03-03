import { useState } from "react";
import { useCMS, PressMention } from "../../contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, CheckCircle } from "lucide-react";

export function PressEditor() {
  const { pressMentions, setPressMentions } = useCMS();
  const [items, setItems] = useState<PressMention[]>([...pressMentions]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setPressMentions(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    const newItem: PressMention = {
      id: `pm-${Date.now()}`,
      publication: "",
      date: "",
      headline: "",
      excerpt: "",
      url: "",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, field: keyof PressMention, value: string) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Press Mentions</Label>
        <Button size="sm" variant="outline" onClick={addItem}>
          <Plus className="w-3 h-3 mr-1" /> Add Press Mention
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((p) => (
          <div key={p.id} className="border border-border rounded-md p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Press Mention</span>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive h-6 w-6"
                onClick={() => removeItem(p.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Publication</Label>
                <Input
                  className="mt-1"
                  value={p.publication}
                  onChange={(e) => updateItem(p.id, "publication", e.target.value)}
                  placeholder="Publication name"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  className="mt-1"
                  type="date"
                  value={p.date}
                  onChange={(e) => updateItem(p.id, "date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Headline</Label>
              <Input
                className="mt-1"
                value={p.headline}
                onChange={(e) => updateItem(p.id, "headline", e.target.value)}
                placeholder="Article headline"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                className="mt-1"
                value={p.url}
                onChange={(e) => updateItem(p.id, "url", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Textarea
                className="mt-1"
                value={p.excerpt}
                onChange={(e) => updateItem(p.id, "excerpt", e.target.value)}
                rows={2}
                placeholder="Brief excerpt..."
              />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="bg-gold hover:bg-gold/90 text-white">
        {saved ? (
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Saved!
          </span>
        ) : (
          "Save Press Mentions"
        )}
      </Button>
    </div>
  );
}

export default PressEditor;
