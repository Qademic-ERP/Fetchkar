import { useState } from 'react';
import { ArrowRight, Image as ImageIcon, Check, Briefcase, Code, Building, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#7C3AED');
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'agency', label: 'Marketing Agency', icon: Building },
    { id: 'freelancer', label: 'Freelancer', icon: User },
    { id: 'consultant', label: 'Consultant / CA', icon: Briefcase },
    { id: 'coach', label: 'Coach / D2C', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-card border border-border rounded-[20px] shadow-card p-10 animate-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex items-center gap-3 mb-10">
          <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-accent' : 'bg-brand-100'}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-accent' : 'bg-brand-100'}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 3 ? 'bg-accent' : 'bg-brand-100'}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 4 ? 'bg-accent' : 'bg-brand-100'}`}></div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Let's set up your agency</h2>
              <p className="text-base font-medium text-muted-foreground mt-2">What's the name of your business?</p>
            </div>
            <input 
              type="text" 
              autoFocus
              placeholder="e.g. Aditi Design Co."
              className="w-full bg-white border border-border rounded-xl px-4 py-4 text-base font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm" 
            />
            <button onClick={() => setStep(2)} className="w-full btn-primary py-4 flex items-center justify-center gap-2 mt-4 text-base">
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">What describes you best?</h2>
              <p className="text-base font-medium text-muted-foreground mt-2">We'll tailor your default templates based on this.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-6 border rounded-[16px] text-left transition-all duration-200 ${
                    category === cat.id 
                      ? 'border-accent bg-brand-50 ring-2 ring-accent ring-offset-2' 
                      : 'border-border bg-white hover:border-brand-300'
                  }`}
                >
                  <cat.icon className={`w-8 h-8 mb-4 ${category === cat.id ? 'text-accent' : 'text-muted-foreground'}`} />
                  <span className={`block font-bold ${category === cat.id ? 'text-accent' : 'text-foreground'}`}>{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={() => setStep(1)} className="flex-1 bg-white border border-border text-foreground rounded-xl px-4 py-4 text-base font-bold hover:bg-brand-50 transition-colors shadow-sm">
                Back
              </button>
              <button onClick={() => setStep(3)} disabled={!category} className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2 text-base">
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Add your branding</h2>
              <p className="text-base font-medium text-muted-foreground mt-2">Upload your logo so clients recognize your requests.</p>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-[20px] p-10 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-brand-50 cursor-pointer transition-all duration-300">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                <ImageIcon size={32} className="text-brand-600" />
              </div>
              <span className="text-lg font-bold text-foreground">Upload your logo</span>
              <span className="text-sm font-semibold text-muted-foreground mt-2">SVG or high-res PNG recommended</span>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={() => setStep(2)} className="flex-1 bg-white border border-border text-foreground rounded-xl px-4 py-4 text-base font-bold hover:bg-brand-50 transition-colors shadow-sm">
                Back
              </button>
              <button onClick={() => setStep(4)} className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2 text-base">
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Pick a brand color</h2>
              <p className="text-base font-medium text-muted-foreground mt-2">We'll use this color for buttons and highlights on your client portal.</p>
            </div>
            
            <div className="flex gap-4 justify-center py-6">
              {['#7C3AED', '#2563EB', '#16A34A', '#DC2626', '#9333EA', '#EA580C'].map(color => (
                <button 
                  key={color} 
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-4 hover:scale-110 transition-all duration-300 flex items-center justify-center ${
                    selectedColor === color ? 'border-foreground scale-110 shadow-md' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && <Check size={20} className="text-white" />}
                </button>
              ))}
            </div>

            <div className="pt-8 flex gap-4">
              <button onClick={() => setStep(3)} className="flex-1 bg-white border border-border text-foreground rounded-xl px-4 py-4 text-base font-bold hover:bg-brand-50 transition-colors shadow-sm">
                Back
              </button>
              <button onClick={() => navigate('/')} className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2 text-base">
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
