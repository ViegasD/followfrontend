import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Order from './pages/Order';
import Tracking from './pages/Tracking';
import TrackSearch from './pages/TrackSearch';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/novo-pedido/:serviceId" element={<Order />} />
          <Route path="/rastrear" element={<TrackSearch />} />
          <Route path="/pedido/:trackingId" element={<Tracking />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
