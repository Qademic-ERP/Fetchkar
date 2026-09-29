import { Star, CheckCircle2 } from 'lucide-react';


export default function Wall() {
  // No params needed for demo

  const brand = {
    name: "Aditi Design Co.",
  };

  const testimonials = [
    {
      id: '1',
      author: 'Rahul Sharma',
      role: 'Founder, Techflow',
      type: 'text',
      stars: 5,
      content: "Working with Aditi was an absolute game changer for us. The new website is converting at 3x our old rate, and the entire process was seamless from start to finish.",
      date: '2 weeks ago'
    },
    {
      id: '2',
      author: 'Priya Patel',
      role: 'Creative Director',
      type: 'video',
      stars: 5,
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      date: '1 month ago'
    },
    {
      id: '3',
      author: 'Karan Singh',
      role: 'CEO, Elevate',
      type: 'audio',
      stars: 4,
      url: 'https://www.w3schools.com/html/horse.ogg',
      content: "Amazing attention to detail. The onboarding was so smooth because of how they collect assets upfront.",
      date: '2 months ago'
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* Decorative Blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-gradient opacity-[0.15] blur-[80px] -z-10 pointer-events-none rounded-full"></div>

      <main className="max-w-[1000px] mx-auto pt-[80px] px-[48px] pb-32">
        
        {/* Header */}
        <header className="text-center mb-[80px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-brand-gradient rounded-2xl shadow-button flex items-center justify-center text-white text-[24px] font-bold mx-auto mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
            {brand.name.charAt(0)}
          </div>
          <h1 className="text-[56px] font-bold text-foreground tracking-tight mb-4 leading-none">
            Wall of Love
          </h1>
          <p className="text-[18px] text-muted-foreground font-medium">
            See what people are saying about {brand.name}
          </p>
        </header>

        {/* Masonry-ish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-start">
          {testimonials.map((t, i) => (
            <div 
              key={t.id} 
              className="bg-card border border-border rounded-2xl p-[32px] shadow-card hover:bg-white/[0.02] transition-all duration-300 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
            >
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} className={idx < t.stars ? "text-[#FBBF24] fill-[#FBBF24]" : "text-white/10 fill-white/5"} />
                ))}
              </div>

              {/* Media Content */}
              {t.type === 'video' && (
                <div className="mb-6 rounded-xl overflow-hidden bg-black/40 border border-border shadow-inner relative aspect-[4/5]">
                  <video src={t.url} controls className="absolute inset-0 w-full h-full object-cover" />
                </div>
              )}

              {t.type === 'audio' && (
                <div className="mb-6 p-4 rounded-xl bg-black/20 border border-border">
                  <audio src={t.url} controls className="w-full h-10 mb-4 invert" />
                  {t.content && <p className="text-[15px] italic text-muted-foreground font-medium leading-relaxed">"{t.content}"</p>}
                </div>
              )}

              {t.type === 'text' && (
                <p className="mb-6 text-[16px] text-foreground font-medium leading-relaxed">
                  "{t.content}"
                </p>
              )}

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center text-foreground font-bold text-[14px] shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground flex items-center gap-1.5 text-[15px]">
                    {t.author} 
                    <CheckCircle2 size={14} className="text-[#4ADE80]" />
                  </h4>
                  <p className="text-[13px] text-muted-foreground font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-[40px] text-muted-foreground font-medium text-[13px] border-t border-border bg-[#101113]">
        Powered by <a href="#" className="text-accent font-semibold hover:text-accent-hover transition-colors">ClientPing</a>
      </footer>
    </div>
  );
}
