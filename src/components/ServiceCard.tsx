import type { Service } from '../lib/types';
import { Link } from 'react-router-dom';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const pricePerK = parseFloat(service.rate);
  const minPrice = ((pricePerK * parseInt(service.min)) / 1000).toFixed(2);

  return (
    <Link
      to={`/novo-pedido/${service.service}`}
      className="group flex flex-col rounded-2xl bg-dark-card border border-dark-border p-5 transition-all duration-300 hover:border-purple-600/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] hover:-translate-y-0.5 h-full"
    >
      {/* Header: badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-purple-600/15 text-purple-400">
          {service.type}
        </span>
        {service.refill && (
          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-400">
            Reposição
          </span>
        )}
        {service.cancel && (
          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/15 text-amber-400">
            Cancelável
          </span>
        )}
      </div>

      {/* Name */}
      <h3
        className="text-white font-medium text-sm leading-snug mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors"
        title={service.name}
      >
        {service.name}
      </h3>

      {/* Category */}
      <p className="text-gray-600 text-xs mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
        {service.category}
      </p>

      {/* Spacer */}
      <div className="mt-auto" />

      {/* Price row */}
      <div className="flex items-end justify-between pt-4 border-t border-dark-border">
        <div>
          <p className="text-gray-600 text-[11px] mb-0.5">A partir de</p>
          <p className="text-white font-bold text-xl leading-none">
            R$ {minPrice}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-[11px] mb-0.5">Quantidade</p>
          <p className="text-gray-400 text-xs font-medium">
            {parseInt(service.min).toLocaleString('pt-BR')} – {parseInt(service.max).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Rate */}
      <p className="text-gray-600 text-[11px] mt-2">
        R$ {pricePerK.toFixed(2)} / 1000 un.
      </p>
    </Link>
  );
}
