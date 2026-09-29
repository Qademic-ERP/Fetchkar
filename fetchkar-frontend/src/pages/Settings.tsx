import { useState, useEffect } from 'react';
import { Check, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

// Helper to darken hex color for hover states
const adjustColor = (color: string, amount: number) => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => 
    ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  );
};

export default function Settings() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('agencySettings');
    return saved ? JSON.parse(saved) : {
      businessName: 'Aditi Design Co.',
      email: 'aditi@example.com',
      category: 'agency',
      color: '#7C3AED'
    };
  });

  // Dynamically apply color live
  useEffect(() => {
    document.documentElement.style.setProperty('--agency-color', form.color);
    document.documentElement.style.setProperty('--agency-color-hover', adjustColor(form.color, -20));
  }, [form.color]);

  const tiers = [
    {
      name: 'Free',
      price: '₹0',
      period: '',
      description: 'Perfect for trying out ClientPing.',
      features: ['2 active requests/month', '1 Wall of Love', 'Email reminders only', 'ClientPing branding shown'],
      current: false,
      cta: 'Current Plan'
    },
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '₹399' : '₹3,999',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For growing freelancers and solo agencies.',
      features: ['Up to 10 active requests', 'WhatsApp reminder links', '3 Walls & Reusable templates', 'All widget styles & No branding'],
      current: true,
      cta: 'Manage Subscription'
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '₹999' : '₹9,999',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For teams and advanced workflows.',
      features: ['Unlimited requests', 'E-signature + deposit', 'Multiple team members', 'AI-assisted testimonial polishing'],
      current: false,
      cta: 'Upgrade to Pro'
    }
  ];

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('agencySettings', JSON.stringify(form));
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-10 relative">
      
      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="text-emerald-400" />
        Settings saved successfully
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold leading-7 text-foreground sm:truncate tracking-tight mb-2">Settings & Billing</h1>
          <p className="text-base text-muted-foreground font-medium">Manage your account, branding, and subscription preferences.</p>
        </header>

        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-xl font-bold text-foreground">Subscription Plan</h2>
            
            {/* Billing Toggle */}
            <div className="flex items-center bg-white border border-border p-1 rounded-xl shadow-sm w-fit">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${billingCycle === 'monthly' ? 'bg-accent text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-accent text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Yearly <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider ${billingCycle === 'yearly' ? 'bg-white/20' : 'bg-status-success/10 text-status-success'}`}>Save 20%</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`glass-card p-8 flex flex-col ${
                  tier.current 
                    ? 'border-2 border-accent shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)] bg-white/90' 
                    : 'border-border/50 bg-white/40'
                }`}
              >
                <div className="mb-6">
                  <h3 className="font-bold text-foreground text-xl">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tight text-foreground leading-none">{tier.price}</span>
                    <span className="text-sm font-bold text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="mt-4 text-sm font-medium text-muted-foreground min-h-[40px]">{tier.description}</p>
                </div>

                <ul className="flex-1 space-y-4 mb-8 pt-6 border-t border-border">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-foreground">
                      <Check size={18} className="text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 px-4 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                    tier.current 
                      ? 'btn-primary' 
                      : 'bg-muted border border-border text-foreground hover:bg-brand-50'
                  }`}
                  disabled={tier.name === 'Free'}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-10 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-8">Account & Branding</h2>
          <div className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Business Name</label>
                <input 
                  type="text" 
                  value={form.businessName}
                  onChange={(e) => setForm({...form, businessName: e.target.value})}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Business Category</label>
                <select 
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm cursor-pointer"
                >
                  <option value="agency">Marketing Agency</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="consultant">Consultant / CA</option>
                  <option value="coach">Coach / D2C</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Company Logo</label>
                <div 
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="border-2 border-dashed border-border rounded-[20px] p-6 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-brand-50 cursor-pointer transition-all duration-300 bg-white relative overflow-hidden"
                >
                  <input 
                    type="file" 
                    id="logo-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setForm({...form, logoUrl: url});
                      }
                    }}
                  />
                  {(form as any).logoUrl ? (
                    <img src={(form as any).logoUrl} alt="Logo" className="max-h-16 object-contain" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-3">
                        <ImageIcon size={24} className="text-brand-600" />
                      </div>
                      <span className="text-sm font-bold text-foreground">Click to upload</span>
                      <span className="text-xs font-semibold text-muted-foreground mt-1">SVG or PNG recommended</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Brand Color</label>
                <div className="flex gap-3 items-center">
                  <input 
                    type="color" 
                    value={form.color}
                    onChange={(e) => setForm({...form, color: e.target.value})}
                    className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0" 
                  />
                  <span className="text-sm font-bold text-foreground uppercase">{form.color}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <button onClick={handleSave} className="btn-primary min-w-[150px]">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
