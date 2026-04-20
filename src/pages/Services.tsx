import { useEffect, useState } from 'react';
import { getServices } from '../lib/api';
import type { ServiceCategory } from '../lib/types';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    getServices()
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = categories
    .map((cat) => ({
      ...cat,
      services: cat.services.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.type.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.services.length > 0)
    .filter((cat) => !activeCategory || cat.category === activeCategory);

  const allCategories = categories.map((c) => c.category);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Nossos Serviços
          </h1>
          <p className="text-gray-500 max-w-xl">
            Encontre o serviço ideal para impulsionar suas redes sociais.
            Todos os preços são por 1000 unidades.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar serviço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/25 transition-all"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !activeCategory
                ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                : 'text-gray-400 hover:text-white border border-dark-border hover:border-white/10'
            }`}
          >
            Todos
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                  : 'text-gray-400 hover:text-white border border-dark-border hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-dark-card border border-dark-border p-6 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/5 rounded w-1/2 mb-6" />
                <div className="h-6 bg-white/5 rounded w-1/3 mb-4" />
                <div className="h-3 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Services grid */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nenhum serviço encontrado</p>
            <p className="text-gray-600 text-sm mt-2">Tente buscar com outros termos</p>
          </div>
        )}

        {!loading &&
          filtered.map((cat) => (
            <div key={cat.category} className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-violet-600" />
                {cat.category}
                <span className="text-sm text-gray-500 font-normal">
                  ({cat.services.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.services.map((s) => (
                  <ServiceCard key={s.service} service={s} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
