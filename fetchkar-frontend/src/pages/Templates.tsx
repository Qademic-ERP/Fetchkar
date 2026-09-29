import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { Plus, FileText, Copy, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TemplatesManager() {
  const [templates, setTemplates] = useState<any[]>([]); useEffect(() => { apiClient('/templates').then(setTemplates).catch(() => setTemplates([
    { id: '1', name: 'Website Onboarding Pack', items: 12, category: 'Web Design', uses: 45 },
    { id: '2', name: 'Post-Project Testimonial', items: 2, category: 'Feedback', uses: 120 },
    { id: '3', name: 'Monthly Ad Assets', items: 5, category: 'Marketing', uses: 12 },
    { id: '4', name: 'Branding Questionnaire', items: 18, category: 'Design', uses: 8 },
  ])); }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Request Templates</h1>
            <p className="text-base text-muted-foreground font-medium">Create and manage reusable checklists to save time onboarding clients.</p>
          </div>
          <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
            <Link to="/requests/new" className="btn-primary">
              <Plus className="-ml-0.5 mr-1 h-5 w-5" />
              New Template
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="glass-card p-6 flex flex-col group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-accent">
                  <FileText size={24} />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-muted-foreground hover:text-accent hover:bg-brand-50 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-accent hover:bg-brand-50 rounded-lg transition-colors">
                    <Copy size={16} />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-status-danger hover:bg-status-danger/10 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-1">{template.name}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-6">
                {template.items} items to collect
              </p>

              <div className="mt-auto pt-5 border-t border-border/50 flex justify-between items-center">
                <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold bg-white border border-border text-foreground uppercase tracking-wider">
                  {template.category}
                </span>
                <span className="text-xs font-bold text-muted-foreground">
                  Used {template.uses} times
                </span>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <Link to="/requests/new" className="glass-card p-6 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-white/90 transition-all border-dashed border-2 cursor-pointer min-h-[220px]">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
              <Plus size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Create Blank Template</h3>
            <p className="text-sm font-medium text-muted-foreground">Start from scratch or import a CSV</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
