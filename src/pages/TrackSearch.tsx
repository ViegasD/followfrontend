import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackSearch() {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (id) {
      navigate(`/pedido/${id}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Rastrear Pedido
          </h1>
          <p className="text-gray-500 text-sm">
            Insira o código de rastreamento que você recebeu para acompanhar o status do seu pedido.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl glass p-8">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Código de Rastreamento
            </label>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="Ex: AB12CD34"
              maxLength={8}
              className="w-full px-4 py-4 rounded-xl bg-dark border border-dark-border text-white placeholder-gray-600 text-center text-2xl font-mono tracking-[0.3em] focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/25 transition-all uppercase"
            />
            <button
              type="submit"
              disabled={trackingId.trim().length < 1}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buscar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
