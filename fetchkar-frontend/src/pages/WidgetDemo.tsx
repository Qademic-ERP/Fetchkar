import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function WidgetDemo() {
  useEffect(() => {
    // Dynamically load the widget script to simulate a 3rd party embedding it
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.setAttribute('data-wall', 'aditi-design');
    document.body.appendChild(script);

    return () => {
      // Cleanup script and DOM element on unmount
      document.body.removeChild(script);
      const container = document.getElementById('clientping-carousel');
      if (container) {
        container.remove();
      }
      // Clean up styles
      const styles = document.head.querySelectorAll('style');
      styles.forEach(s => {
        if (s.innerHTML.includes('cp-widget-wrapper')) {
          s.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 font-sans p-8">
      <Link to="/walls" className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-12 group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-serif text-neutral-900 mb-4">Sample 3rd Party Website</h1>
          <p className="text-neutral-600">
            This page represents an arbitrary external website (like a WordPress blog or Webflow landing page). 
            The carousel below is rendered entirely by the <code>widget.js</code> script injecting self-contained HTML/CSS, perfectly isolated from the host site's styling.
          </p>
        </div>

        {/* The target div for the widget */}
        <div className="bg-white p-12 shadow-xl rounded-xl border border-neutral-200 my-12">
          <h2 className="text-xl font-bold text-center mb-8 text-neutral-800 uppercase tracking-widest">What Our Customers Say</h2>
          
          <div id="clientping-carousel"></div>
          
        </div>

      </div>
    </div>
  );
}
