import { Plus, CheckCircle, Clock, ArrowUpRight, FileText,  } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

export default function Dashboard() {
  const navigate = useNavigate();
  const [, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    apiClient('/requests').then(data => {
      setRecentActivity(data.slice(0, 5));
    }).catch(err => {
      console.error(err);
      // Fallback
      setRecentActivity([
        { id: '3', client: 'Wayne Ent.', template: 'Website Onboarding', status: 'In Progress', progress: 45, updated: 'Oct 12' },
        { id: '4', client: 'Daily Planet', template: 'Brand Assets', status: 'Completed', progress: 100, updated: 'Oct 10' },
      ]);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const stats = [
    { name: 'Total Requests', value: recentActivity.length > 0 ? '14' : '0', change: '+2', changeType: 'positive', icon: FileText },
    { name: 'Active Clients', value: recentActivity.length > 0 ? '3' : '0', change: '0', changeType: 'neutral', icon: CheckCircle },
    { name: 'Pending Nudges', value: '2', change: '-1', changeType: 'positive', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">
              Dashboard
            </h2>
            <p className="mt-1 text-base text-muted-foreground font-medium">
              Overview of your client requests and templates.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Link
              to="/requests/new"
              className="inline-flex items-center justify-center rounded-full text-sm font-black transition-all bg-gradient-to-br from-[#86efac] to-[#3b82f6] text-white h-14 px-8 shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.9),inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] transform hover:scale-105 active:scale-95"
            >
              <Plus className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
              New Request
            </Link>
          </div>
        </div>

        {/* Stats Grid - Modern Floating Cards */}
        <dl className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden bg-white/70 shadow-[6px_6px_12px_rgba(163,177,198,0.2),-6px_-6px_12px_rgba(255,255,255,0.8)] rounded-[2rem] px-6 py-6 flex items-center gap-6 border-2 border-white"
            >
              <dt>
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-4 shadow-inner flex-shrink-0">
                  <item.icon className="h-6 w-6 text-accent group-hover:text-white transition-colors" aria-hidden="true" />
                </div>
                <p className="truncate text-sm font-bold text-slate-500 tracking-tight">{item.name}</p>
              </dt>
              <dd className="flex items-baseline">
                <p className="text-4xl font-black text-slate-800">{item.value}</p>
                <p
                  className={`ml-3 flex items-baseline text-sm font-bold ${
                    item.changeType === 'positive' ? 'text-status-success' : 'text-muted-foreground'
                  }`}
                >
                  {item.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 shrink-0 self-center text-status-success mr-0.5" aria-hidden="true" />
                  ) : null}
                  <span className="sr-only">
                    {item.changeType === 'positive' ? 'Increased' : 'Changed'} by
                  </span>
                  {item.change}
                </p>
              </dd>
            </div>
          ))}
        </dl>

        {/* Main Table Area - Modern Card */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-6 border-b border-border/50 flex justify-between items-center bg-white/40">
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
            <Link to="/requests" className="text-sm font-bold text-accent hover:text-accent-hover transition-colors">View all</Link>
          </div>
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Client
                      </th>
                      <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Template
                      </th>
                      <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="relative py-4 pl-3 pr-6 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {recentActivity.map((req) => (
                      <tr key={req.id} className="bg-white/70 shadow-[4px_4px_8px_rgba(163,177,198,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] rounded-2xl cursor-pointer transition-all hover:scale-[1.01]" onClick={() => navigate(`/requests/review/${req.id}`)}>
                        <td className="whitespace-nowrap py-5 pl-6 pr-3 text-sm font-bold text-foreground rounded-l-2xl">
                          {req.client}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-muted-foreground">{req.template}</td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm">
                          <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                            req.status === 'Completed' ? 'bg-status-success/10 text-status-success border-status-success/20' :
                            req.status === 'In Progress' ? 'bg-status-info/10 text-status-info border-status-info/20' :
                            'bg-status-warning/10 text-status-warning border-status-warning/20'
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
                        <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-bold rounded-r-2xl">
                          <span className="text-accent hover:text-accent-hover transition-colors">
                            Review<span className="sr-only">, {req.client}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Needs a Nudge Panel */}
        <div className="mt-10 glass-card overflow-hidden">
          <div className="px-6 py-6 border-b border-border/50 bg-white/40 flex justify-between items-center">
            <h3 className="text-lg font-bold text-foreground">Needs a nudge today</h3>
            <span className="bg-status-warning/10 text-status-warning text-xs font-bold px-3 py-1 rounded-full border border-status-warning/20">
              2 Clients
            </span>
          </div>
          <div className="">
            {[
              { id: '1', client: 'LexCorp', days: 5, phone: '+919876543210', template: 'Monthly SEO Review' },
              { id: '2', client: 'Stark Industries', days: 3, phone: '+919876543211', template: 'Design Assets' }
            ].map(nudge => (
              <div key={nudge.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-foreground">{nudge.client}</h4>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Waiting on {nudge.template} • Last active {nudge.days} days ago</p>
                </div>
                <button 
                  onClick={() => window.open(`https://wa.me/${nudge.phone}?text=Hey%20${nudge.client},%20just%20checking%20in%20on%20the%20${encodeURIComponent(nudge.template)}%20request!`, '_blank')}
                  className="bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  Send via WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
