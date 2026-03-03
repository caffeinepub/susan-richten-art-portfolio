import { useState } from "react";
import { useCMS, NavItem } from "../../contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, CheckCircle } from "lucide-react";

export function NavigationEditor() {
  const { navItems, setNavItems } = useCMS();
  const [items, setItems] = useState<NavItem[]>([...navItems]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setNavItems(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    const newItem: NavItem = {
      id: `nav-${Date.now()}`,
      label: "New Page",
      path: "/new-page",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, field: keyof NavItem, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const inputClass = "mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Navigation Items</Label>
        <Button size="sm" variant="outline" onClick={addItem}>
          <Plus className="w-3 h-3 mr-1" /> Add Item
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2 items-center border border-border rounded-md p-3">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Label</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateItem(item.id, "label", e.target.value)}
                  className={inputClass}
                  placeholder="Page name"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Path</label>
                <input
                  type="text"
                  value={item.path}
                  onChange={(e) => updateItem(item.id, "path", e.target.value)}
                  className={inputClass}
                  placeholder="/path"
                />
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="shrink-0 text-destructive hover:text-destructive"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="bg-gold hover:bg-gold/90 text-white">
        {saved ? (
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Saved!
          </span>
        ) : (
          "Save Navigation"
        )}
      </Button>
    </div>
  );
}

export default NavigationEditor;
