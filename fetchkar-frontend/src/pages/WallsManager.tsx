import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { Link } from 'react-router-dom';
import { Plus, LayoutTemplate, Settings2, ExternalLink, Globe } from 'lucide-react';


export default function WallsManager() {
  const [walls, setWalls] = useState<any[]>([]); 
  const [tagFilter, setTagFilter] = useState('All');
  useEffect(() => { apiClient('/walls').then(setWalls).catch(() => setWalls([
    { id: '1', name: 'Main Agency Wall', slug: 'aditi-design', testimonials: 24, views: 1240, status: 'Live', tags: ['Website'] },
    { id: '2', name: 'Course Students', slug: 'ui-course', testimonials: 8, views: 300, status: 'Draft', tags: ['Course'] },
  ])); }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Walls of Love</h1>
            <p className="text-base text-muted-foreground font-medium">Curate and publish your best client testimonials to public walls or embeddable widgets.</p>
          </div>
          <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
            <select 
              value={tagFilter} 
              onChange={(e) => setTagFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Tags</option>
              {Array.from(new Set(walls.flatMap(w => w.tags || []))).map(tag => (
                <option key={tag as string} value={tag as string}>{tag}</option>
              ))}
            </select>
            <Link to="/widget-demo" className="btn-secondary">
              <LayoutTemplate className="-ml-0.5 mr-2 h-4 w-4" />
              Embed Widgets
            </Link>
            <button className="btn-primary" onClick={() => alert('New Wall Modal Opened')}>
              <Plus className="-ml-0.5 mr-1 h-5 w-5" />
              New Wall
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {walls.filter(w => tagFilter === 'All' || (w.tags && w.tags.includes(tagFilter))).map(wall => (
            <div key={wall.id} className="glass-card p-0 flex flex-col overflow-hidden">
              <div className="p-8 pb-6 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-glow">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">{wall.name}</h3>
                      <a href={`/wall/${wall.slug}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent hover:underline flex items-center gap-1 mt-1">
                        clientping.in/wall/{wall.slug}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border ${
                    wall.status === 'Live' ? 'bg-status-success/10 text-status-success border-status-success/20' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {wall.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground mt-8">
                  <div>
                    <span className="text-2xl font-black text-foreground block mb-1">{wall.testimonials}</span>
                    Approved Testimonials
                  </div>
                  <div>
                    <span className="text-2xl font-black text-foreground block mb-1">{(wall.views / 1000).toFixed(1)}k</span>
                    Page Views
                  </div>
                </div>
              </div>

              <div className="bg-white/50 border-t border-border/50 p-4 px-8 flex justify-end gap-3">
                <Link to={`/walls/${wall.id}`} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Settings2 size={16} /> Configure Wall
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
