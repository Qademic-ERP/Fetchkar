import { useState } from 'react'; import type { ReactNode } from 'react';
import { GripVertical, Trash2, Send, Type, Image, ToggleLeft, Settings2, AlignLeft, Calendar, Link as LinkIcon, CheckSquare, Star, MessageSquareQuote } from 'lucide-react';

export default function RequestBuilder() {
  const [title, setTitle] = useState('Website Onboarding Pack');
  const [items, setItems] = useState<any[]>([
    { id: '1', type: 'text', label: 'Company Name', config: {} },
    { id: '2', type: 'file', label: 'Company Logo (High-Res PNG or SVG)', config: {} }
  ]);

  const addItem = (type: string) => {
    setItems([...items, { id: Math.random().toString(), type, label: '', config: type === 'testimonial' ? { stars: 'optional' } : {} }]);
  };

  const updateItem = (id: string, label: string) => {
    setItems(items.map(item => item.id === id ? { ...item, label } : item));
  };
  
  const updateConfig = (id: string, config: any) => {
    setItems(items.map(item => item.id === id ? { ...item, config: { ...item.config, ...config } } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const iconMap: Record<string, ReactNode> = {
    text: <Type size={16} className="text-indigo-500" />,
    long_text: <AlignLeft size={16} className="text-blue-500" />,
    file: <Image size={16} className="text-emerald-500" />,
    yes_no: <ToggleLeft size={16} className="text-amber-500" />,
    dropdown: <Settings2 size={16} className="text-purple-500" />,
    checkboxes: <CheckSquare size={16} className="text-fuchsia-500" />,
    date: <Calendar size={16} className="text-rose-500" />,
    url: <LinkIcon size={16} className="text-cyan-500" />,
    testimonial: <MessageSquareQuote size={16} className="text-orange-500" />
  };

  const colorMap: Record<string, string> = {
    text: 'bg-indigo-50 border-indigo-100 text-indigo-700',
    long_text: 'bg-blue-50 border-blue-100 text-blue-700',
    file: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    yes_no: 'bg-amber-50 border-amber-100 text-amber-700',
    dropdown: 'bg-purple-50 border-purple-100 text-purple-700',
    checkboxes: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700',
    date: 'bg-rose-50 border-rose-100 text-rose-700',
    url: 'bg-cyan-50 border-cyan-100 text-cyan-700',
    testimonial: 'bg-orange-50 border-orange-100 text-orange-700'
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-500 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-white/40/80 backdrop-blur-md z-10 py-6 border-b border-border/60 -mx-6 px-6 lg:-mx-8 lg:px-8">
        <div className="flex-1">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold tracking-tight text-foreground bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full placeholder:text-slate-300"
            placeholder="Untitled Template"
          />
          <p className="text-sm text-muted-foreground mt-1">Build your data collection form below.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => {
              const btn = e.currentTarget;
              btn.innerText = 'Saved!';
              setTimeout(() => btn.innerText = 'Save as Template', 2000);
            }}
            className="text-sm font-semibold text-muted-foreground hover:text-accent transition-colors px-2"
          >
            Save as Template
          </button>
          <button onClick={() => window.open('/r/demo', '_blank')} className="btn-secondary">
            Preview
          </button>
          <button 
            onClick={(e) => {
              const btn = e.currentTarget;
              const original = btn.innerHTML;
              btn.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Link Copied!</span>';
              setTimeout(() => btn.innerHTML = original, 2000);
            }}
            className="btn-primary gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Send size={16} />
            Generate Link
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex flex-col bg-white border border-border rounded-2xl p-5 group shadow-sm transition-all hover:shadow-md hover:border-indigo-200 focus-within:border-brand-400 focus-within:ring-1 focus-within:ring-brand-400">
            {/* Index number indicator */}
            <div className="absolute -left-3 -top-3 w-7 h-7 bg-white border border-border text-muted-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
              {index + 1}
            </div>

            <div className="flex gap-4 items-start">
              <button className="mt-2 text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-600 transition-colors">
                <GripVertical size={20} />
              </button>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${colorMap[item.type]}`}>
                    {iconMap[item.type]}
                    {item.type.replace('_', ' ')}
                  </span>
                </div>
                <input 
                  type="text" 
                  value={item.label}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  className="w-full bg-transparent text-lg font-semibold text-foreground border-none focus:outline-none p-0 placeholder:text-slate-300"
                  placeholder={item.type === 'testimonial' ? "e.g. Could you share a quick review of your experience working with us?" : "Type your question here..."}
                  autoFocus={item.label === ''}
                />
              </div>
              
              <button 
                onClick={() => removeItem(item.id)} 
                className="mt-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-xl hover:bg-rose-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            {(item.type === 'dropdown' || item.type === 'checkboxes') && (
              <div className="pl-10 mt-4">
                <input 
                  type="text" 
                  placeholder="Comma separated options (e.g. Option 1, Option 2)" 
                  className="w-full text-sm font-medium bg-white/40 border border-border text-foreground rounded-xl p-3 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                />
              </div>
            )}
            
            {item.type === 'testimonial' && (
              <div className="pl-10 mt-4 pt-4 border-t border-slate-100 flex items-center gap-4">
                <div className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Star size={16} className="text-amber-400 fill-amber-400" /> Star Rating:
                </div>
                <div className="flex bg-white/60 rounded-lg p-1 gap-1">
                  {['hidden', 'optional', 'required'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => updateConfig(item.id, { stars: opt })}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-colors ${
                        item.config?.stars === opt 
                          ? 'bg-white text-foreground shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Block Area */}
      <div className="border-2 border-dashed border-border rounded-2xl p-8 bg-white/40/50 flex flex-col items-center justify-center text-center space-y-5 transition-colors hover:border-brand-200 hover:bg-brand-50/50">
        <p className="text-base font-bold text-foreground">Add a new block to your request</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => addItem('text')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-brand-200 hover:text-indigo-700 hover:bg-brand-50 shadow-sm transition-all hover:-translate-y-0.5">
            <Type size={16} className="text-indigo-500" /> Short Text
          </button>
          <button onClick={() => addItem('long_text')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 shadow-sm transition-all hover:-translate-y-0.5">
            <AlignLeft size={16} className="text-blue-500" /> Long Text
          </button>
          <button onClick={() => addItem('file')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 shadow-sm transition-all hover:-translate-y-0.5">
            <Image size={16} className="text-emerald-500" /> File Upload
          </button>
          <button onClick={() => addItem('yes_no')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 shadow-sm transition-all hover:-translate-y-0.5">
            <ToggleLeft size={16} className="text-amber-500" /> Yes/No
          </button>
          <button onClick={() => addItem('dropdown')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 shadow-sm transition-all hover:-translate-y-0.5">
            <Settings2 size={16} className="text-purple-500" /> Dropdown
          </button>
          <button onClick={() => addItem('checkboxes')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-fuchsia-300 hover:text-fuchsia-700 hover:bg-fuchsia-50 shadow-sm transition-all hover:-translate-y-0.5">
            <CheckSquare size={16} className="text-fuchsia-500" /> Multi-Select
          </button>
          <button onClick={() => addItem('date')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50 shadow-sm transition-all hover:-translate-y-0.5">
            <Calendar size={16} className="text-rose-500" /> Date
          </button>
          <button onClick={() => addItem('url')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border text-foreground rounded-xl text-sm font-bold hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50 shadow-sm transition-all hover:-translate-y-0.5">
            <LinkIcon size={16} className="text-cyan-500" /> URL
          </button>
        </div>
        <div className="w-full pt-4 mt-2 border-t border-border/60">
          <button onClick={() => addItem('testimonial')} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5">
            <MessageSquareQuote size={18} /> Add Testimonial Request
          </button>
        </div>
      </div>
    </div>
  );
}
