import React, { useState } from 'react';
import { HeroEditor } from '../../components/admin/HeroEditor';
import { NavigationEditor } from '../../components/admin/NavigationEditor';
import { AboutPageEditor } from '../../components/admin/AboutPageEditor';
import { CommissionsPageEditor } from '../../components/admin/CommissionsPageEditor';
import { TestimonialsEditor } from '../../components/admin/TestimonialsEditor';
import { PressEditor } from '../../components/admin/PressEditor';

type Tab = 'hero' | 'navigation' | 'about' | 'commissions' | 'testimonials' | 'press';

const TABS: { key: Tab; label: string }[] = [
  { key: 'hero', label: 'Homepage Hero' },
  { key: 'navigation', label: 'Navigation' },
  { key: 'about', label: 'About' },
  { key: 'commissions', label: 'Commissions' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'press', label: 'Press' },
];

export function PagesEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-charcoal mb-1">Pages Editor</h1>
        <p className="font-body text-sm text-charcoal-muted">Edit content for each page section</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-beige-dark mb-8 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 font-body text-xs tracking-widest uppercase border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 shadow-xs max-w-3xl">
        {activeTab === 'hero' && <HeroEditor />}
        {activeTab === 'navigation' && <NavigationEditor />}
        {activeTab === 'about' && <AboutPageEditor />}
        {activeTab === 'commissions' && <CommissionsPageEditor />}
        {activeTab === 'testimonials' && <TestimonialsEditor />}
        {activeTab === 'press' && <PressEditor />}
      </div>
    </div>
  );
}

export default PagesEditor;
