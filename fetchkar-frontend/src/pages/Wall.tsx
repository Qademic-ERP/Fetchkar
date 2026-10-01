import { useState } from 'react';
import { Star, CheckCircle2, Search, Filter } from 'lucide-react';

export default function Wall() {
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

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const filteredTestimonials = testimonials.filter(t => {
    const matchesSearch = t.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.content && t.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesRating = filterRating === 'all' || t.stars.toString() === filterRating;
    return matchesSearch && matchesType && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* Decorative Blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-gradient opacity-[0.15] blur-[80px] -z-10 pointer-events-none rounded-full"></div>

      <main className="max-w-[1000px] mx-auto pt-[80px] px-[48px] pb-32">
        
        {/* Header */}
        <header className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-[24px] bg-white border border-border shadow-card mb-8">
            <span className="text-[32px] font-black text-brand-600 tracking-tighter leading-none">{brand.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Loved by <span className="text-transparent bg-clip-text bg-brand-gradient">Our Clients</span></h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-medium max-w-2xl mx-auto">Don't just take our word for it. Here's what founders and creative directors have to say about working with {brand.name}.</p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 bg-card border border-border p-4 rounded-2xl shadow-sm">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search reviews by name or keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-brand-500 appearance-none min-w-[120px] pr-8"
              >
                <option value="all">All Formats</option>
                <option value="text">Text Only</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
              <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative flex-1 md:flex-none">
              <select 
                value={filterRating} 
                onChange={(e) => setFilterRating(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-brand-500 appearance-none min-w-[120px] pr-8"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Masonry-ish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-start">
          {filteredTestimonials.length === 0 ? (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-muted-foreground font-medium">No reviews match your filters.</div>
          ) : (
            filteredTestimonials.map((t, i) => (
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

                {/* Media (Video/Audio) */}
                {t.type === 'video' && t.url && (
                  <div className="rounded-xl overflow-hidden mb-6 border border-border/50 bg-black/5 aspect-[4/3] shadow-inner relative group">
                    <video src={t.url} controls className="w-full h-full object-cover" />
                  </div>
                )}
                {t.type === 'audio' && t.url && (
                  <div className="mb-6 bg-muted/50 rounded-xl p-4 border border-border/50 shadow-inner">
                    <audio src={t.url} controls className="w-full h-[40px]" />
                  </div>
                )}

                {/* Text Content */}
                {t.content && (
                  <p className="text-foreground text-[17px] leading-[1.6] font-medium mb-8">"{t.content}"</p>
                )}

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-foreground border border-border/50">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      {t.author}
                      <CheckCircle2 size={14} className="text-status-success fill-status-success/20" />
                    </div>
                    <div className="text-muted-foreground text-[13px] font-medium">{t.role}</div>
                  </div>
                  <div className="ml-auto text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    {t.date}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
