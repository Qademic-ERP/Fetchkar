import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GripVertical, Trash2, Plus, Download, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function WallConfig() {
  
  const [items, setItems] = useState([
    { id: '1', author: 'Rahul Sharma', role: 'Founder, Techflow', type: 'text', stars: 5, content: "Working with Aditi was an absolute game changer for us. The new website is converting at 3x our old rate, and the entire process was seamless from start to finish.", date: '2 weeks ago' },
    { id: '2', author: 'Priya Patel', role: 'Creative Director', type: 'video', stars: 5, url: 'https://www.w3schools.com/html/mov_bbb.mp4', date: '1 month ago' },
    { id: '3', author: 'Karan Singh', role: 'CEO, Elevate', type: 'audio', stars: 4, url: 'https://www.w3schools.com/html/horse.ogg', content: "Amazing attention to detail. The onboarding was so smooth because of how they collect assets upfront.", date: '2 months ago' }
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);
  
  const [importForm, setImportForm] = useState({ author: '', role: '', content: '', stars: 5, type: 'text' });
  const [exportItem, setExportItem] = useState<any>(null);
  const [bgStyle, setBgStyle] = useState('bg-gradient-to-br from-indigo-500 to-purple-600');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Drag and drop handlers
  const handleDragStart = (e: any, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: any, targetId: string) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;
    
    const draggedIndex = items.findIndex(i => i.id === draggedId);
    const targetIndex = items.findIndex(i => i.id === targetId);
    
    const newItems = [...items];
    const draggedItem = newItems.splice(draggedIndex, 1)[0];
    newItems.splice(targetIndex, 0, draggedItem);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  // Import handler
  const handleImportSubmit = () => {
    if (!importForm.author || !importForm.content) return;
    setItems([{
      id: Date.now().toString(),
      author: importForm.author,
      role: importForm.role,
      type: importForm.type,
      stars: importForm.stars,
      content: importForm.content,
      date: 'Just now'
    }, ...items]);
    setShowImport(false);
    setImportForm({ author: '', role: '', content: '', stars: 5, type: 'text' });
  };

  // Export to Canvas logic
  useEffect(() => {
    if (exportItem && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clean canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simple gradient background fallback
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (bgStyle.includes('indigo')) {
        grad.addColorStop(0, '#6366f1'); grad.addColorStop(1, '#9333ea');
      } else if (bgStyle.includes('emerald')) {
        grad.addColorStop(0, '#10b981'); grad.addColorStop(1, '#059669');
      } else {
        grad.addColorStop(0, '#f43f5e'); grad.addColorStop(1, '#e11d48');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Card background
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.roundRect(80, 80, 840, 840, 32);
      ctx.fill();

      // Stars
      ctx.fillStyle = '#f59e0b';
      ctx.font = '36px Arial';
      ctx.fillText('★'.repeat(exportItem.stars), 120, 160);

      // Text Content
      ctx.fillStyle = '#1e293b';
      ctx.font = '500 40px -apple-system, BlinkMacSystemFont, sans-serif';
      
      // Wrap text logic
      const words = ('"' + exportItem.content + '"').split(' ');
      let line = '';
      let y = 260;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 760 && n > 0) {
          ctx.fillText(line, 120, y);
          line = words[n] + ' ';
          y += 56;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 120, y);

      // Author Info
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(150, 800, 32, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(exportItem.author.charAt(0), 138, 810);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(exportItem.author, 200, 795);
      
      ctx.fillStyle = '#64748b';
      ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(exportItem.role || 'Customer', 200, 830);
    }
  }, [exportItem, bgStyle]);

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `testimonial-${exportItem?.author.replace(' ', '-')}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans p-8 pb-32">
      <Link to="/walls" className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-8 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-1">Wall Configuration</h1>
            <p className="text-neutral-500 text-sm">Manage testimonials for "Aditi Design Co."</p>
          </div>
          
          <div className="flex gap-3">
            <Link to="/wall/aditi-design" target="_blank" className="btn-secondary">
              <ExternalLink size={16} className="mr-2" /> View Wall
            </Link>
            <button className="btn-primary" onClick={() => setShowImport(!showImport)}>
              <Plus size={16} className="mr-2" /> Manual Import
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-4">
            
            {showImport && (
              <div className="bg-white border border-brand-200 shadow-md shadow-brand-500/10 rounded-2xl p-6 mb-6 animate-in slide-in-from-top-4">
                <h3 className="font-bold text-lg mb-4">Manually Import Review</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input type="text" placeholder="Author Name" value={importForm.author} onChange={e => setImportForm({...importForm, author: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" />
                    <input type="text" placeholder="Role / Company" value={importForm.role} onChange={e => setImportForm({...importForm, role: e.target.value})} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" />
                  </div>
                  <textarea placeholder="Paste review text here..." value={importForm.content} onChange={e => setImportForm({...importForm, content: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[100px]" />
                  <div className="flex justify-between items-center">
                    <select value={importForm.stars} onChange={e => setImportForm({...importForm, stars: parseInt(e.target.value)})} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                    </select>
                    <button onClick={handleImportSubmit} className="btn-primary">Add Review</button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-neutral-800 mb-6 flex items-center gap-2"><GripVertical size={18} className="text-neutral-400" /> Drag to Reorder Testimonials</h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div 
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${draggedId === item.id ? 'opacity-50 border-brand-500 bg-brand-50/50' : 'border-neutral-200 bg-white hover:border-neutral-300 shadow-sm cursor-grab active:cursor-grabbing'}`}
                  >
                    <GripVertical size={20} className="text-neutral-400 mt-2 cursor-grab" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-neutral-900">{item.author}</div>
                        <div className="flex text-amber-400">{'★'.repeat(item.stars)}</div>
                      </div>
                      <div className="text-sm text-neutral-500 mb-2">{item.role}</div>
                      {item.content && <p className="text-sm text-neutral-700 line-clamp-2">"{item.content}"</p>}
                      {item.type !== 'text' && <div className="text-xs font-bold text-brand-600 uppercase mt-2">{item.type} Attachment</div>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => setExportItem(item)} className="p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Export as Image">
                        <ImageIcon size={18} />
                      </button>
                      <button className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Sidebar */}
          {exportItem && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="font-bold text-neutral-800 mb-6 flex items-center gap-2"><ImageIcon size={18} className="text-indigo-500" /> Share as Image</h3>
              
              <div className="mb-4 text-sm font-medium text-neutral-500 mb-2">Select Theme</div>
              <div className="flex gap-2 mb-6">
                <button onClick={() => setBgStyle('bg-gradient-to-br from-indigo-500 to-purple-600')} className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm ring-2 ring-offset-2 ring-indigo-500 focus:outline-none"></button>
                <button onClick={() => setBgStyle('bg-gradient-to-br from-emerald-400 to-teal-600')} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-sm focus:outline-none"></button>
                <button onClick={() => setBgStyle('bg-gradient-to-br from-rose-400 to-red-600')} className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-red-600 shadow-sm focus:outline-none"></button>
              </div>

              {/* The hidden canvas used for generation */}
              <canvas ref={canvasRef} width={1000} height={1000} className="hidden" />

              {/* HTML Preview (looks like the canvas) */}
              <div className={`aspect-square w-full rounded-xl overflow-hidden p-6 flex items-center justify-center shadow-inner ${bgStyle}`}>
                <div className="bg-white/95 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                   <div>
                     <div className="text-amber-400 text-lg tracking-widest mb-4">{'★'.repeat(exportItem.stars)}</div>
                     <p className="text-neutral-800 font-bold text-[15px] leading-relaxed line-clamp-6">"{exportItem.content}"</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">{exportItem.author.charAt(0)}</div>
                     <div>
                       <div className="text-xs font-bold text-neutral-900">{exportItem.author}</div>
                       <div className="text-[10px] text-neutral-500">{exportItem.role}</div>
                     </div>
                   </div>
                </div>
              </div>

              <button onClick={downloadCanvas} className="w-full btn-primary mt-6 justify-center">
                <Download size={18} className="mr-2" /> Download Square Image
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
