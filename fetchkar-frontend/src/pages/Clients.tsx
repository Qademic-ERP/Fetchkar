import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';


export default function ClientsDirectory() {
  const [clients, setClients] = useState<any[]>([]); useEffect(() => { apiClient('/clients').then(setClients).catch(() => setClients([ 
    { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', requests: 3, status: 'Active' },
    { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 98765 43211', requests: 1, status: 'Completed' },
    { id: '3', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43212', requests: 5, status: 'Active' },
    { id: '4', name: 'Aditi Desai', email: 'aditi@example.com', phone: '+91 98765 43213', requests: 0, status: 'Inactive' },
  ])); }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Clients Directory</h1>
            <p className="text-base text-muted-foreground font-medium">Manage your client address book and their request history.</p>
          </div>
          <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
            <Link to="/requests/new" className="btn-primary">
              <Plus className="-ml-0.5 mr-1 h-5 w-5" />
              Add Client
            </Link>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row gap-4 items-center bg-white/40">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search by name, email, or phone..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
              />
            </div>
            <button className="btn-secondary whitespace-nowrap">
              <Filter size={14} className="mr-2" /> Filter
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-border text-left">
              <thead>
                <tr>
                  <th className="py-4 pl-6 pr-3 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Client Details</th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact</th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Requests</th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="relative py-4 pl-3 pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-muted/50 transition-colors">
                    <td className="whitespace-nowrap py-5 pl-6 pr-3">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold border border-brand-200">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-foreground">{client.name}</div>
                          <div className="text-xs font-medium text-muted-foreground mt-0.5">Added recently</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                      <div className="font-medium text-foreground">{client.email}</div>
                      <div className="text-muted-foreground font-medium mt-0.5">{client.phone}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm font-bold text-foreground">
                      {client.requests}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                        client.status === 'Active' ? 'bg-status-success/10 text-status-success border-status-success/20' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium">
                      <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-white">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
