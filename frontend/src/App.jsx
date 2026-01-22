import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-brand-pink selection:text-white">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
