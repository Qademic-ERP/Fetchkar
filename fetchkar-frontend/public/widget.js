(function() {
  // ClientPing Embeddable Widgets
  // Usage: <script src="widget.js" data-wall="aditi-design" data-layout="grid"></script><div id="clientping-widget"></div>

  const scriptTag = document.currentScript;
  const layout = scriptTag.getAttribute('data-layout') || 'carousel';
  
  // Find or create the mount point
  let container = document.getElementById('clientping-widget') || document.getElementById('clientping-carousel');
  if (!container && layout !== 'badge' && layout !== 'toast') {
    container = document.createElement('div');
    container.id = 'clientping-widget';
    scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);
  } else if (layout === 'badge' || layout === 'toast') {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  // Inject scoped CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .cp-widget-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      color: #0f172a;
    }
    .cp-widget-wrapper * { box-sizing: border-box; }
    
    /* Base Card */
    .cp-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .cp-stars { color: #f59e0b; font-size: 18px; }
    .cp-content { font-size: 15px; line-height: 1.5; color: #334155; flex-grow: 1; }
    .cp-author { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
    .cp-avatar { width: 40px; height: 40px; border-radius: 50%; background: #e0e7ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; }
    .cp-author-info div:first-child { font-weight: 700; font-size: 14px; }
    .cp-author-info div:last-child { font-size: 12px; color: #64748b; }

    /* Carousel */
    .cp-carousel-track {
      display: flex; gap: 24px; overflow-x: auto; padding: 20px 4px; scroll-snap-type: x mandatory;
      -ms-overflow-style: none; scrollbar-width: none;
    }
    .cp-carousel-track::-webkit-scrollbar { display: none; }
    .cp-carousel-item { flex: 0 0 320px; scroll-snap-align: start; }
    
    /* Grid */
    .cp-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; padding: 20px 0;
    }
    
    /* Hero */
    .cp-hero .cp-card {
      max-width: 800px; margin: 0 auto; text-align: center; padding: 48px; border-radius: 24px;
      background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%); border: none; box-shadow: 0 10px 25px -5px rgba(79,70,229,0.1);
    }
    .cp-hero .cp-content { font-size: 24px; font-weight: 500; font-style: italic; color: #1e293b; margin-bottom: 24px;}
    .cp-hero .cp-author { flex-direction: column; gap: 8px; }
    .cp-hero .cp-avatar { width: 64px; height: 64px; font-size: 24px; margin: 0 auto;}

    /* Badge */
    .cp-badge {
      position: fixed; bottom: 24px; left: 24px; background: white; border: 1px solid #e2e8f0; border-radius: 100px;
      padding: 8px 16px; display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      z-index: 9999; cursor: pointer; transition: transform 0.2s; font-size: 14px; font-weight: 600;
    }
    .cp-badge:hover { transform: translateY(-2px); }
    .cp-badge .cp-stars { font-size: 14px; margin-right: 4px; }
    
    /* Toast */
    .cp-toast {
      position: fixed; bottom: 24px; right: 24px; background: white; border: 1px solid #e2e8f0; border-radius: 12px;
      padding: 16px; width: 320px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); z-index: 9999;
      animation: cp-slide-up 0.5s ease-out; cursor: pointer;
    }
    .cp-toast-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .cp-toast-title { font-size: 12px; font-weight: 700; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.5px; }
    .cp-toast .cp-content { font-size: 14px; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .cp-toast .cp-author { margin-top: 0; }
    .cp-toast .cp-avatar { width: 32px; height: 32px; font-size: 12px; }
    @keyframes cp-slide-up { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `;
  document.head.appendChild(style);

  // Mock Data
  const testimonials = [
    { author: 'Rahul Sharma', role: 'Founder, Techflow', stars: 5, content: 'Working with Aditi was an absolute game changer for us. The new website is converting at 3x our old rate, and the entire process was seamless from start to finish.' },
    { author: 'Vikram Singh', role: 'CMO, Elevate', stars: 5, content: 'The branding they delivered perfectly captures our vision. We have received countless compliments from our customers.' },
    { author: 'Priya Patel', role: 'Creative Director', stars: 5, content: 'A truly exceptional agency partner. Fast, reliable, and incredibly talented.' },
    { author: 'Neha Gupta', role: 'CEO, Brightly', stars: 5, content: 'They understood our needs immediately and executed flawlessly. Highly recommended!' },
  ];

  function renderStars(count) {
    return '<span class="cp-stars">' + '★'.repeat(count) + '</span>';
  }

  function renderCard(t, className = '') {
    return `
      <div class="cp-card ${className}">
        ${renderStars(t.stars)}
        <div class="cp-content">"${t.content}"</div>
        <div class="cp-author">
          <div class="cp-avatar">${t.author.charAt(0)}</div>
          <div class="cp-author-info">
            <div>${t.author}</div>
            <div>${t.role}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Logic
  let html = `<div class="cp-widget-wrapper">`;

  if (layout === 'grid') {
    html += `<div class="cp-grid">${testimonials.map(t => renderCard(t)).join('')}</div>`;
  } 
  else if (layout === 'hero') {
    html += `<div class="cp-hero">${renderCard(testimonials[0])}</div>`;
  }
  else if (layout === 'badge') {
    html += `
      <div class="cp-badge">
        <div>${renderStars(5)}</div>
        <div>Trusted by 50+ amazing clients</div>
      </div>
    `;
  }
  else if (layout === 'toast') {
    const t = testimonials[Math.floor(Math.random() * testimonials.length)];
    html += `
      <div class="cp-toast">
        <div class="cp-toast-header">
          <div class="cp-toast-title">New 5-Star Review</div>
          <div style="color: #94a3b8; font-size: 16px;">×</div>
        </div>
        ${renderStars(t.stars)}
        <div class="cp-content" style="margin-top: 8px;">"${t.content}"</div>
        <div class="cp-author">
          <div class="cp-avatar">${t.author.charAt(0)}</div>
          <div class="cp-author-info">
            <div>${t.author}</div>
            <div>${t.role}</div>
          </div>
        </div>
      </div>
    `;
  }
  else {
    // default carousel
    html += `
      <div class="cp-carousel-track">
        ${testimonials.map(t => renderCard(t, 'cp-carousel-item')).join('')}
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;

  // Add click to dismiss for toast
  if (layout === 'toast') {
    container.querySelector('.cp-toast').addEventListener('click', function() {
      this.style.display = 'none';
    });
  }

})();