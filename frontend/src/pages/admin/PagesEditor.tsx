import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import HeroEditor from '../../components/admin/HeroEditor';
import NavigationEditor from '../../components/admin/NavigationEditor';
import AboutPageEditor from '../../components/admin/AboutPageEditor';
import CommissionsPageEditor from '../../components/admin/CommissionsPageEditor';
import { TestimonialsEditor } from '../../components/admin/TestimonialsEditor';
import { PressEditor } from '../../components/admin/PressEditor';

type Tab = 'hero' | 'navigation' | 'about' | 'commissions' | 'testimonials' | 'press';

const TABS: { key: Tab; label: string; previewUrl: string }[] = [
  { key: 'hero', label: 'Homepage Hero', previewUrl: '/' },
  { key: 'navigation', label: 'Navigation', previewUrl: '/' },
  { key: 'about', label: 'About', previewUrl: '/about' },
  { key: 'commissions', label: 'Commissions', previewUrl: '/commissions' },
  { key: 'testimonials', label: 'Testimonials', previewUrl: '/testimonials' },
  { key: 'press', label: 'Press', previewUrl: '/testimonials' },
];

export function PagesEditor() {
  const [activeTab, setActiveTab] = useState<Tab>('hero');

  const currentTab = TABS.find(t => t.key === activeTab);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl text-charcoal mb-1">Pages Editor</h1>
          <p className="font-body text-sm text-charcoal-muted">Edit content for each page section</p>
        </div>
        {currentTab && (
          <button
            onClick={() => window.open(currentTab.previewUrl, '_blank')}
            className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-beige font-body text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors shrink-0"
          >
            <ExternalLink size={14} />
            Preview Page
          </button>
        )}
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
