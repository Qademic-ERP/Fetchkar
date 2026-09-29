import { Plus, Search, Filter, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

interface RequestModel {
  id: string;
  client: string; // We'll map from client name
  template: string; // We'll map from template name
  status: string;
  progress: number;
  updated: string;
}

export default function Requests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient('/requests').then(data => {
      setRequests(data);
    }).catch(err => {
      console.error(err);
      // fallback mock data if backend fails
      setRequests([
        { id: '1', client: 'Acme Corp', template: 'Website Onboarding', status: 'In Progress', progress: 60, updated: '2 hours ago' },
        { id: '2', client: 'Stark Industries', template: 'Brand Assets', status: 'In Progress', progress: 20, updated: '4 days ago' },
        { id: '3', client: 'Wayne Ent.', template: 'Website Onboarding', status: 'Submitted', progress: 100, updated: '1 day ago' },
      ]);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Requests</h1>
            <p className="text-base text-muted-foreground font-medium">Manage and track all your active client pipelines.</p>
          </div>
          <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
            <Link to="/requests/bulk" className="bg-white border border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-brand-50 transition-colors flex items-center">
              Bulk Send (CSV)
            </Link>
            <Link to="/requests/new" className="btn-primary">
              <Plus className="-ml-0.5 mr-1 h-5 w-5" />
              Create Request
            </Link>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          {loading ? (
            <div className="p-10 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
          <>
          <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row gap-4 items-center bg-white/40">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by client or template..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
              />
            </div>
            <button className="btn-secondary whitespace-nowrap" onClick={() => alert('Filter opened')}>
              <Filter size={14} className="mr-2" /> Filter
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-border text-left">
              <thead>
                <tr>
                  <th className="py-4 pl-6 pr-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Client</th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Template</th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Progress</th>
                  <th className="py-4 pl-3 pr-6 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map(req => (
                  <tr 
                    onClick={() => navigate(`/requests/review/${req.id}`)} 
                    key={req.id} 
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="whitespace-nowrap py-5 pl-6 pr-3 text-sm font-bold text-foreground">{req.client}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-muted-foreground">{req.template}</td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                        req.status === 'Completed' || req.status === 'Submitted' ? 'bg-status-success/10 text-status-success border-status-success/20' :
                        'bg-status-info/10 text-status-info border-status-info/20'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-muted-foreground w-1/4">
                       <div className="flex items-center gap-3">
                         <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden border border-border">
                           <div className="bg-accent h-full rounded-full transition-all duration-500" style={{ width: `${req.progress}%` }}></div>
                         </div>
                         <span className="text-xs font-bold w-8">{req.progress}%</span>
                       </div>
                    </td>
                    <td className="whitespace-nowrap py-5 pl-3 pr-6 text-sm text-muted-foreground font-medium text-right">{req.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
          )}
        </div>

      </div>
    </div>
  );
}
