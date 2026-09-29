import { useState } from 'react';
import { Check, X, ArrowLeft, Send, MessageCircle, Star,  } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RequestReview() {
  const [items, setItems] = useState([
    { id: '1', label: 'Company Name', type: 'text', answer: 'Acme Corp', status: 'approved', note: '' },
    { id: '2', label: 'Company Logo', type: 'file', answer: 'acme-logo.svg', status: 'pending', note: '' },
    { 
      id: '4', 
      label: ' Testimonial', 
      type: 'testimonial', 
      answer: { type: '', url: 'https://www.w3schools.com/html/mov_bbb.mp4', stars: 5 }, 
      status: 'pending', 
      note: '' 
    },
    { id: '3', label: 'Brand Guidelines', type: 'file', answer: 'brand-book-v2.pdf', status: 'rejected', note: 'Please upload a higher resolution version.' }
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const setStatus = (id: string, status: 'approved' | 'rejected' | 'pending') => {
    setItems(items.map(item => item.id === id ? { ...item, status } : item));
    if (status === 'rejected') {
      setActiveNoteId(id);
    } else {
      setActiveNoteId(null);
    }
  };

  const updateNote = (id: string, note: string) => {
    setItems(items.map(item => item.id === id ? { ...item, note } : item));
  };

  const completed = items.filter(i => i.status === 'approved').length;
  const progressPercent = (completed / items.length) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-32">
      <div className="mb-10">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-accent transition-colors mb-6 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>
        <div className="bg-white border border-border rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
              Reviewing Assets
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1">Acme Corp</h1>
            <p className="text-lg font-medium text-muted-foreground">Website Onboarding Pack</p>
          </div>
          <div className="relative z-10 w-full md:w-64">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Approval Progress</span>
              <span className="text-lg font-bold text-accent">{completed}/{items.length}</span>
            </div>
            <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden border border-border/50">
              <div 
                className="bg-accent h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={item.id} className={`border rounded-2xl p-6 transition-all duration-300 shadow-sm ${
            item.status === 'approved' ? 'border-emerald-200 bg-emerald-50/50 hover:shadow-md' :
            item.status === 'rejected' ? 'border-rose-200 bg-rose-50/50 hover:shadow-md' :
            'border-border bg-white hover:border-indigo-200 hover:shadow-md'
          }`}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                      item.status === 'approved' ? 'bg-emerald-200 text-emerald-800' :
                      item.status === 'rejected' ? 'bg-rose-200 text-rose-800' :
                      'bg-white/60 text-muted-foreground'
                    }`}>
                      {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{item.label}</h3>
                  </div>
                  {item.type === 'testimonial' && typeof item.answer === 'object' && item.answer.stars && (
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < (item.answer as any).stars ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                      ))}
                    </div>
                  )}
                </div>
                
                {item.type === 'testimonial' && typeof item.answer === 'object' ? (
                  <div className={`rounded-xl overflow-hidden border ${
                    item.status === 'approved' ? 'border-emerald-200 bg-emerald-50' :
                    item.status === 'rejected' ? 'border-rose-200 bg-rose-50' :
                    'border-border bg-slate-900'
                  }`}>
                    {item.answer.type === 'video' && (
                      <video src={item.answer.url} controls className="w-full max-h-[400px] object-contain bg-black" />
                    )}
                    {item.answer.type === 'audio' && (
                      <div className="p-6 flex justify-center bg-slate-900">
                        <audio src={item.answer.url} controls className="w-full max-w-md" />
                      </div>
                    )}
                    {item.answer.type === 'text' && (
                      <div className="p-5 bg-white text-[15px] font-medium text-foreground italic">
                        "{item.answer.url}"
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`rounded-xl p-4 text-[15px] font-medium border ${
                    item.status === 'approved' ? 'bg-white border-emerald-100 text-emerald-900' :
                    item.status === 'rejected' ? 'bg-white border-rose-100 text-rose-900' :
                    'bg-white/40 border-border text-slate-800'
                  }`}>
                    {typeof item.answer === 'string' ? item.answer : JSON.stringify(item.answer)}
                  </div>
                )}

                {(activeNoteId === item.id || item.status === 'rejected') && (
                  <div className="mt-4 animate-in slide-in-from-top-2 relative">
                    <div className="absolute -left-3 top-4 w-3 h-px bg-rose-200"></div>
                    <div className="ml-4">
                      <label className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">
                        <MessageCircle size={14} /> Rejection Note (visible to client)
                      </label>
                      <textarea 
                        value={item.note}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        placeholder="Explain what needs to be fixed..."
                        className="w-full bg-white border border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl p-4 text-[15px] font-medium text-foreground transition-all resize-y min-h-[100px] shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex sm:flex-col gap-3 shrink-0 w-full sm:w-auto mt-2">
                <button 
                  onClick={() => setStatus(item.id, 'approved')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    item.status === 'approved' 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                      : 'bg-white border border-border text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <Check size={18} /> Approve
                </button>
                <button 
                  onClick={() => setStatus(item.id, 'rejected')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                    item.status === 'rejected' 
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' 
                      : 'bg-white border border-border text-slate-600 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={(e) => {
            const btn = e.currentTarget;
            const original = btn.innerHTML;
            btn.innerHTML = '<span class="flex items-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Emails Sent!</span>';
            btn.classList.add('bg-emerald-500', 'hover:bg-emerald-600');
            btn.classList.remove('btn-primary');
            setTimeout(() => {
              btn.innerHTML = original;
              btn.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
              btn.classList.add('btn-primary');
            }, 3000);
          }}
          className="btn-primary px-8 py-4 text-base rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 hover:-translate-y-1 transition-all"
        >
          <Send size={18} /> Update Client & Send Reminders
        </button>
      </div>
    </div>
  );
}
