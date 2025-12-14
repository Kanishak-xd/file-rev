import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SimpleHeader } from './components/simple-header';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <SimpleHeader />
        <main>
          <Routes>
            <Route path="/user" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<Navigate to="/user" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
