import { useState } from "react";
import { Artwork, useCMS } from "../../contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Upload, Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ArtworkFormProps {
  artwork?: Artwork;
  onClose: () => void;
}

export function ArtworkForm({ artwork, onClose }: ArtworkFormProps) {
  const { addArtwork, updateArtwork } = useCMS();

  const [form, setForm] = useState({
    title: artwork?.title ?? "",
    year: artwork?.year ?? new Date().getFullYear(),
    medium: artwork?.medium ?? "",
    size: artwork?.size ?? artwork?.dimensions ?? "",
    location: artwork?.location ?? "",
    description: artwork?.description ?? "",
    category: artwork?.category ?? "",
    availability: artwork?.availability ?? "Available" as Artwork["availability"],
    featured: artwork?.featured ?? false,
    visible: artwork?.visible ?? true,
    imageUrl: artwork?.imageUrl ?? "",
    additionalImages: artwork?.additionalImages ?? [] as string[],
  });

  const handleSave = () => {
    if (artwork) {
      updateArtwork(artwork.id, {
        ...form,
        dimensions: form.size,
        price: artwork.price,
        available: form.availability === "Available",
        order: artwork.order,
      });
    } else {
      const newArtwork: Artwork = {
        id: Date.now().toString(),
        order: Date.now(),
        title: form.title,
        year: form.year,
        medium: form.medium,
        dimensions: form.size,
        size: form.size,
        location: form.location,
        description: form.description,
        category: form.category,
        availability: form.availability,
        available: form.availability === "Available",
        featured: form.featured,
        visible: form.visible,
        imageUrl: form.imageUrl,
        additionalImages: form.additionalImages,
        price: 0,
      };
      addArtwork(newArtwork);
    }
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleAdditionalImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({ ...prev, additionalImages: [...prev.additionalImages, ...urls] }));
  };

  const removeAdditionalImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const inputClass = "mt-1";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{artwork ? "Edit Artwork" : "Add Artwork"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Artwork title"
              />
            </div>
            <div>
              <Label>Year</Label>
              <Input
                className={inputClass}
                type="number"
                value={form.year}
                onChange={(e) => setForm((p) => ({ ...p, year: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Medium</Label>
              <Input
                className={inputClass}
                value={form.medium}
                onChange={(e) => setForm((p) => ({ ...p, medium: e.target.value }))}
                placeholder="Oil on Canvas"
              />
            </div>
            <div>
              <Label>Size</Label>
              <Input
                className={inputClass}
                value={form.size}
                onChange={(e) => setForm((p) => ({ ...p, size: e.target.value }))}
                placeholder='24" × 36"'
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Input
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                placeholder="Seascape, Abstract..."
              />
            </div>
            <div>
              <Label>Availability</Label>
              <select
                className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                value={form.availability}
                onChange={(e) =>
                  setForm((p) => ({ ...p, availability: e.target.value as Artwork["availability"] }))
                }
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Location</Label>
            <Input
              className={inputClass}
              value={form.location}
              onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
              placeholder="Private collection, Gallery name..."
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              className={inputClass}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              placeholder="Artwork description..."
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm((p) => ({ ...p, visible: e.target.checked }))}
              />
              Visible
            </label>
          </div>

          {/* Primary Image */}
          <div>
            <Label>Primary Image</Label>
            <div className="mt-1 flex items-center gap-3">
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-sm border border-border"
                />
              )}
              <label className="cursor-pointer flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                <Upload className="w-4 h-4" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <Label className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Additional Photos
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.additionalImages.map((url, i) => (
                <div key={i} className="relative group">
                  <img
                    src={url}
                    alt={`Additional ${i + 1}`}
                    className="w-16 h-16 object-cover rounded-sm border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(i)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="cursor-pointer w-16 h-16 flex flex-col items-center justify-center border border-dashed border-border rounded-sm text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-xs mt-1">Add</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAdditionalImages}
                />
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-gold hover:bg-gold/90 text-white">
            {artwork ? "Save Changes" : "Add Artwork"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ArtworkForm;
