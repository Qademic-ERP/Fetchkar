import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, Phone, FileText, Download, Clock, Image as ImageIcon, Send, ArrowLeft } from 'lucide-react';

export default function ClientDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch the client details, their requests, and assets
    setTimeout(() => {
      setClientData({
        id,
        name: id === '1' ? 'Rahul Sharma' : id === '2' ? 'Priya Patel' : 'Vikram Singh',
        email: id === '1' ? 'rahul@example.com' : 'client@example.com',
        phone: '+91 98765 43210',
        company: 'Techflow Inc',
        joinedAt: 'Mar 15, 2026',
        requests: [
          { id: '101', name: 'Website Onboarding - Techflow', template: 'Website Onboarding', status: 'Completed', date: 'Mar 16, 2026' },
          { id: '102', name: 'Q2 Brand Assets', template: 'Brand Assets', status: 'In Progress', date: 'Apr 02, 2026' }
        ],
        assets: [
          { id: 'a1', name: 'company_logo.png', type: 'image', requestName: 'Website Onboarding', date: 'Mar 18, 2026', size: '2.4 MB' },
          { id: 'a2', name: 'brand_guidelines.pdf', type: 'document', requestName: 'Website Onboarding', date: 'Mar 18, 2026', size: '5.1 MB' },
          { id: 'a3', name: 'founder_headshot.jpg', type: 'image', requestName: 'Q2 Brand Assets', date: 'Apr 05, 2026', size: '4.2 MB' }
        ],
        history: [
          { id: 'h1', action: 'Request Completed', details: 'Website Onboarding', date: 'Mar 20, 2026' },
          { id: 'h2', action: 'Email Reminder Sent', details: 'Automated nudge for Q2 Brand Assets', date: 'Apr 10, 2026' },
          { id: 'h3', action: 'File Uploaded', details: 'founder_headshot.jpg', date: 'Apr 05, 2026' },
        ]
      });
      setLoading(false);
    }, 600);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/clients" className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-2xl border border-brand-200">
              {clientData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{clientData.name}</h1>
              <p className="text-muted-foreground font-medium flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1.5"><Mail size={14} /> {clientData.email}</span>
                <span className="flex items-center gap-1.5"><Phone size={14} /> {clientData.phone}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary">Edit Client</button>
            <Link to="/requests/new" className="btn-primary gap-2">
              <Send size={16} /> New Request
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active & Past Requests */}
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-border/50 bg-white/40 flex justify-between items-center">
                <h2 className="text-lg font-bold text-foreground">Requests & Pipelines</h2>
              </div>
              <div className="divide-y divide-border">
                {clientData.requests.map((req: any) => (
                  <div key={req.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div>
                      <h3 className="font-bold text-sm text-foreground">{req.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium mt-1">Template: {req.template} • {req.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                        req.status === 'Completed' ? 'bg-status-success/10 text-status-success border-status-success/20' :
                        'bg-status-info/10 text-status-info border-status-info/20'
                      }`}>
                        {req.status}
                      </span>
                      <Link to={`/requests/review/${req.id}`} className="text-accent hover:underline text-sm font-bold">Review</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Library (All Files) */}
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-border/50 bg-white/40 flex justify-between items-center">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><ImageIcon size={18} /> Asset Vault</h2>
                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded">{clientData.assets.length} Files</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {clientData.assets.map((asset: any) => (
                    <div key={asset.id} className="border border-border rounded-xl p-4 flex items-start gap-4 hover:border-brand-300 transition-colors group cursor-pointer">
                      <div className={`p-3 rounded-lg ${asset.type === 'image' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {asset.type === 'image' ? <ImageIcon size={20} /> : <FileText size={20} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate" title={asset.name}>{asset.name}</p>
                        <p className="text-xs font-medium text-muted-foreground mt-1 truncate">from {asset.requestName}</p>
                        <p className="text-[10px] font-semibold text-muted-foreground mt-1">{asset.size} • {asset.date}</p>
                      </div>
                      <button className="text-muted-foreground group-hover:text-accent transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar (History & CRM Details) */}
          <div className="space-y-8">
            
            <div className="glass-card p-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">Client Profile</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Company</p>
                  <p className="font-medium text-foreground">{clientData.company}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Client Since</p>
                  <p className="font-medium text-foreground">{clientData.joinedAt}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Requests</p>
                  <p className="font-medium text-foreground">{clientData.requests.length}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2"><Clock size={16} /> Activity History</h2>
              <div className="relative border-l border-border/60 ml-3 space-y-6">
                {clientData.history.map((event: any) => (
                  <div key={event.id} className="relative pl-6">
                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-white"></div>
                    <p className="text-sm font-bold text-foreground">{event.action}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">{event.details}</p>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1">{event.date}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
