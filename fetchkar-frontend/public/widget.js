(function() {
  // ClientPing Embeddable Carousel Widget
  // Usage: <script src="widget.js" data-wall="aditi-design"></script><div id="clientping-carousel"></div>

  const scriptTag = document.currentScript;
  // const wallSlug = scriptTag.getAttribute('data-wall') || 'default';
  
  // Find or create the mount point
  let container = document.getElementById('clientping-carousel');
  if (!container) {
    container = document.createElement('div');
    container.id = 'clientping-carousel';
    scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);
  }

  // Inject scoped CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .cp-widget-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .cp-carousel-track {
      display: flex;
      gap: 24px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 10px 20px;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .cp-carousel-track::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
    .cp-card {
      scroll-snap-align: center;
      flex: 0 0 320px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      box-sizing: border-box;
      transition: transform 0.2s;
    }
    .cp-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .cp-stars {
      color: #fbbf24;
      font-size: 18px;
      margin-bottom: 12px;
      letter-spacing: 2px;
    }
    .cp-content {
      font-size: 15px;
      color: #334155;
      line-height: 1.6;
      margin-bottom: 20px;
      font-weight: 500;
    }
    .cp-author-row {
      display: flex;
      align-items: center;
      gap: 12px;
      border-top: 1px solid #f1f5f9;
      padding-top: 16px;
    }
    .cp-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e0e7ff;
      color: #4338ca;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }
    .cp-author-info {
      flex: 1;
    }
    .cp-author-name {
      font-weight: 700;
      color: #0f172a;
      font-size: 14px;
      margin: 0 0 2px 0;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .cp-author-role {
      font-size: 12px;
      color: #64748b;
      margin: 0;
    }
    .cp-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      background: #10b981;
      border-radius: 50%;
      color: white;
    }
    .cp-badge svg {
      width: 8px;
      height: 8px;
    }
  `;
  document.head.appendChild(style);

  // Normally we would fetch this from the backend using the wallSlug:
  // fetch(`https://api.clientping.in/v1/widgets/${wallSlug}`).then(...)
  const mockData = [
    {
      author: 'Rahul Sharma',
      role: 'Founder, Techflow',
      stars: 5,
      content: "Working with Aditi was an absolute game changer for us. The new website is converting at 3x our old rate."
    },
    {
      author: 'Priya Patel',
      role: 'Creative Director',
      stars: 5,
      content: "The smoothest onboarding I have ever experienced. I knew exactly what assets I needed to provide."
    },
    {
      author: 'Karan Singh',
      role: 'CEO, Elevate',
      stars: 4,
      content: "Amazing attention to detail. Would highly recommend to any small business looking to upgrade their brand."
    }
  ];

  const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  // Render HTML
  container.innerHTML = `
    <div class="cp-widget-wrapper">
      <div class="cp-carousel-track">
        ${mockData.map(t => `
          <div class="cp-card">
            <div class="cp-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
            <div class="cp-content">"${t.content}"</div>
            <div class="cp-author-row">
              <div class="cp-avatar">${t.author.charAt(0)}</div>
              <div class="cp-author-info">
                <p class="cp-author-name">${t.author} <span class="cp-badge">${checkIcon}</span></p>
                <p class="cp-author-role">${t.role}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
})();
