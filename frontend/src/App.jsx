import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="min-h-screen font-sans selection:bg-brand-pink selection:text-white">
          <AppRoutes />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
