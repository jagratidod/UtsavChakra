import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/UserContext';
import { VendorProvider } from './context/VendorContext';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <VendorProvider>
          <div className="min-h-screen font-sans selection:bg-brand-pink selection:text-white">
            <AppRoutes />
          </div>
        </VendorProvider>
      </UserProvider>
    </Router>
  );
}

export default App;

