import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient, setAuthToken } from '../api/client';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await apiClient('/auth/login', {
          data: { email, password }
        });
        setAuthToken(response.token);
        navigate('/');
      } else {
        const response = await apiClient('/auth/register', {
          data: { email, password, businessName }
        });
        setAuthToken(response.token);
        navigate('/onboarding');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
      
      <div className="w-full max-w-sm glass-card p-8 relative z-10">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white font-black text-xl mx-auto mb-6 shadow-sm">
            CP
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            {isLogin ? 'Enter your details to sign in.' : 'Start collecting client assets effortlessly.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-status-danger/10 border border-status-danger/20 rounded-xl text-status-danger text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Business Name</label>
              <input 
                type="text" 
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm" 
                placeholder="Acme Agency"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm" 
              placeholder="********"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-border">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-muted-foreground hover:text-accent font-bold transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
