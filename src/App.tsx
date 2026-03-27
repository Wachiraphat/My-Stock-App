import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-indigo-700 text-white p-4 shadow-lg">
          <div className="container mx-auto flex gap-6">
            <span className="font-bold mr-4">Stock Master</span>
            <Link to="/" className="hover:text-indigo-200">Dashboard</Link>
            <Link to="/products" className="hover:text-indigo-200">จัดการสินค้า</Link>
          </div>
        </nav>

        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductManagement />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;