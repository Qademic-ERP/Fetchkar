import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RequestBuilder from './pages/RequestBuilder';
import RequestReview from './pages/RequestReview';
import ClientPage from './pages/ClientPage';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';

import Requests from './pages/Requests';
import Clients from './pages/Clients';
import Analytics from './pages/Analytics';
import Templates from './pages/Templates';
import WallsManager from './pages/WallsManager';
import Wall from './pages/Wall';
import WidgetDemo from './pages/WidgetDemo';
import BulkRequest from './pages/BulkRequest';

function App() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('agencySettings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.color) {
          document.documentElement.style.setProperty('--agency-color', parsed.color);
          const adjustColor = (color: string, amount: number) => {
            return '#' + color.replace(/^#/, '').replace(/../g, c => 
              ('0'+Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).substr(-2)
            );
          };
          document.documentElement.style.setProperty('--agency-color-hover', adjustColor(parsed.color, -20));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="templates" element={<Templates />} />
          <Route path="requests" element={<Requests />} />
          <Route path="requests/new" element={<RequestBuilder />} />
          <Route path="requests/bulk" element={<BulkRequest />} />
          <Route path="requests/review/:id" element={<RequestReview />} />
          <Route path="clients" element={<Clients />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="walls" element={<WallsManager />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Public facing client page */}
        <Route path="/r/:slug" element={<ClientPage />} />
        {/* Public facing wall page */}
        <Route path="/wall/:slug" element={<Wall />} />
        {/* Widget demo */}
        <Route path="/widget-demo" element={<WidgetDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
