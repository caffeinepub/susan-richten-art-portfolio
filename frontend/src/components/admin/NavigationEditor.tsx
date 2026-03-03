import { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import type { NavigationItem } from '../../contexts/CMSContext';

export function NavigationEditor() {
  const { navigationItems, updateNavigationItems } = useCMS();
  const [items, setItems] = useState<NavigationItem[]>([...navigationItems]);
  const [saved, setSaved] = useState(false);

  const addItem = () => {
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems(prev => [
      ...prev,
      { id: nextId, name: 'New Page', path: '/new-page', order: prev.length + 1 },
    ]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof NavigationItem, value: string | number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleSave = () => {
    updateNavigationItems(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-charcoal mb-1">Navigation</h2>
        <p className="text-sm text-charcoal/60">Edit the site navigation links.</p>
      </div>

      <ul className="space-y-2">
        {[...items].sort((a, b) => a.order - b.order).map(item => (
          <li key={item.id} className="flex items-center gap-2 bg-stone/10 rounded px-3 py-2">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                value={item.name}
                onChange={e => updateItem(item.id, 'name', e.target.value)}
                placeholder="Label"
                className="border border-stone/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <input
                type="text"
                value={item.path}
                onChange={e => updateItem(item.id, 'path', e.target.value)}
                placeholder="/path"
                className="border border-stone/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 text-xs shrink-0"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          onClick={addItem}
          className="bg-charcoal text-white px-3 py-1.5 rounded text-sm hover:bg-charcoal/80 transition-colors"
        >
          Add Item
        </button>
        <button
          onClick={handleSave}
          className="bg-gold text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          {saved ? 'Saved!' : 'Save Navigation'}
        </button>
      </div>
    </div>
  );
}

export default NavigationEditor;
