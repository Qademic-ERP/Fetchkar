import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutTemplate, Grid, CreditCard, Bell, Maximize } from 'lucide-react';

export default function WidgetDemo() {
  const [layout, setLayout] = useState('carousel');

  useEffect(() => {
    // Cleanup previous widget
    const oldContainer = document.getElementById('clientping-widget');
    if (oldContainer) oldContainer.remove();
    
    // Also cleanup floating ones
    const oldBadges = document.querySelectorAll('.cp-badge');
    oldBadges.forEach(b => b.remove());
    const oldToasts = document.querySelectorAll('.cp-toast');
    oldToasts.forEach(t => t.remove());

    const oldStyles = document.head.querySelectorAll('style');
    oldStyles.forEach(s => {
      if (s.innerHTML.includes('cp-widget-wrapper')) s.remove();
    });

    // Load new widget
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.setAttribute('data-wall', 'aditi-design');
    script.setAttribute('data-layout', layout);
    // Use a specific ID to avoid React reconciliation issues
    script.id = 'cp-script';
    
    // Remove old script if exists
    const existingScript = document.getElementById('cp-script');
    if (existingScript) existingScript.remove();

    document.body.appendChild(script);

    return () => {
      const s = document.getElementById('cp-script');
      if (s) s.remove();
      const c = document.getElementById('clientping-widget');
      if (c) c.remove();
      document.querySelectorAll('.cp-badge, .cp-toast').forEach(el => el.remove());
      const styles = document.head.querySelectorAll('style');
      styles.forEach(sty => {
        if (sty.innerHTML.includes('cp-widget-wrapper')) sty.remove();
      });
    };
  }, [layout]);

  return (
    <div className="min-h-screen bg-neutral-100 font-sans p-8 pb-32">
      <Link to="/walls" className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-8 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-1">Widget Sandbox</h1>
            <p className="text-neutral-500 text-sm">Test different embed layouts on a sample host website.</p>
          </div>
          
          <div className="flex gap-2 bg-neutral-100 p-1 rounded-xl">
            {[
              { id: 'carousel', icon: <CreditCard size={16} />, label: 'Carousel' },
              { id: 'grid', icon: <Grid size={16} />, label: 'Grid' },
              { id: 'hero', icon: <Maximize size={16} />, label: 'Hero' },
              { id: 'badge', icon: <LayoutTemplate size={16} />, label: 'Badge' },
              { id: 'toast', icon: <Bell size={16} />, label: 'Toast' },
            ].map(l => (
              <button 
                key={l.id}
                onClick={() => setLayout(l.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${layout === l.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'}`}
              >
                {l.icon} {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* The target div for the widget */}
        <div className="bg-white p-12 shadow-xl rounded-xl border border-neutral-200 mt-12 min-h-[400px]">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 uppercase tracking-widest">Sample Startup Landing Page</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          {layout !== 'badge' && layout !== 'toast' ? (
            <div id="clientping-widget"></div>
          ) : (
            <div className="text-center text-neutral-400 font-medium py-20 border-2 border-dashed border-neutral-200 rounded-xl">
              The {layout} widget is floating on the screen.<br/>Check the bottom corners!
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
