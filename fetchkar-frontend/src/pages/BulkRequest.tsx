import { useState } from 'react';
import { UploadCloud, CheckCircle2, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BulkRequest() {
  const [, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState(false);

  // Mock parsed data
  const clients = [
    { name: 'Rahul Sharma', phone: '+919876543210' },
    { name: 'Priya Patel', phone: '+919876543211' },
    { name: 'Vikram Singh', phone: '+919876543212' },
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setTimeout(() => setParsed(true), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-sm font-bold text-accent">
            <Link to="/requests" className="hover:underline">Requests</Link>
            <span>/</span>
            <span>Bulk Send</span>
          </div>
          <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Bulk Send Requests</h1>
          <p className="text-base text-muted-foreground font-medium">Upload a CSV to generate multiple WhatsApp links at once.</p>
        </header>

        {!parsed ? (
          <div className="bg-card shadow-card border border-border rounded-[20px] p-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6">
              <UploadCloud size={32} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Upload your client list</h2>
            <p className="text-sm font-medium text-muted-foreground mb-8 text-center max-w-sm">
              CSV file must contain two columns: <span className="font-bold text-foreground">Name</span> and <span className="font-bold text-foreground">Phone Number</span>.
            </p>
            
            <label className="btn-primary cursor-pointer">
              <span>Select CSV File</span>
              <input type="file" accept=".csv" className="hidden" onChange={handleUpload} />
            </label>
            
            <button className="mt-6 flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors">
              <Download size={16} /> Download CSV Template
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-status-success/10 border border-status-success/20 rounded-[20px] p-6 flex items-start gap-4">
              <CheckCircle2 className="text-status-success shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="text-lg font-bold text-status-success mb-1">Successfully parsed 3 clients</h3>
                <p className="text-sm font-medium text-status-success/80">Select a template below to generate your WhatsApp links.</p>
              </div>
            </div>

            <div className="bg-card shadow-card border border-border rounded-[20px] p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">1. Select Request Template</h3>
              <select className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm cursor-pointer mb-8">
                <option>Website Onboarding Pack</option>
                <option>Post-Project Testimonial</option>
                <option>Monthly Tax Documents</option>
              </select>

              <h3 className="text-lg font-bold text-foreground mb-4">2. Generate & Send</h3>
              <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                {clients.map((c, i) => (
                  <div key={i} className="p-4 flex items-center justify-between bg-white">
                    <div>
                      <p className="text-sm font-bold text-foreground">{c.name}</p>
                      <p className="text-xs font-medium text-muted-foreground">{c.phone}</p>
                    </div>
                    <button 
                      onClick={() => window.open(`https://wa.me/${c.phone}?text=Hi%20${encodeURIComponent(c.name)},%20please%20complete%20this%20request!`, '_blank')}
                      className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:brightness-110 transition-all flex items-center gap-2"
                    >
                      Send <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
