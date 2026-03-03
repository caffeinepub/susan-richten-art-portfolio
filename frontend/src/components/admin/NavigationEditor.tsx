import { useState } from 'react';
import { useCMS, NavigationItem } from '../../contexts/CMSContext';

export default function NavigationEditor() {
  const { navigationItems, updateNavigationItems } = useCMS();
  const [items, setItems] = useState<NavigationItem[]>([...navigationItems]);
  const [saved, setSaved] = useState(false);

  function addItem() {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      name: 'New Page',
      path: '/new-page',
      order: items.length + 1,
    };
    setItems(prev => [...prev, newItem]);
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateItem(id: string, field: keyof NavigationItem, value: string | number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  }

  function handleSave() {
    updateNavigationItems(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputClass = 'w-full px-3 py-2 border border-sand/60 rounded-sm bg-warm-white text-charcoal text-sm focus:outline-none focus:border-gold';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-charcoal">Navigation Items</h3>
        <button
          onClick={addItem}
          className="text-xs text-gold hover:text-gold/80 border border-gold/40 hover:border-gold px-3 py-1 rounded-sm transition-colors"
        >
          + Add Item
        </button>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex gap-2 items-center p-3 border border-sand/40 rounded-sm">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-charcoal-muted mb-1 block">Label</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={e => updateItem(item.id, 'name', e.target.value)}
                  className={inputClass}
                  placeholder="Page name"
                />
              </div>
              <div>
                <label className="text-xs text-charcoal-muted mb-1 block">Path</label>
                <input
                  type="text"
                  value={item.path}
                  onChange={e => updateItem(item.id, 'path', e.target.value)}
                  className={inputClass}
                  placeholder="/path"
                />
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 transition-colors shrink-0 text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-gold text-warm-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors"
      >
        {saved ? 'Saved!' : 'Save Navigation'}
      </button>
    </div>
  );
}
