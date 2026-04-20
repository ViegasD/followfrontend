import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getOrder } from '../lib/api';
import type { OrderOut } from '../lib/types';
import StatusBadge from '../components/StatusBadge';

const progressSteps = [
  { key: 'pending_payment', label: 'Pagamento' },
  { key: 'payment_approved', label: 'Aprovado' },
  { key: 'processing', label: 'Processando' },
  { key: 'completed', label: 'Concluído' },
];

function getStepIndex(status: string): number {
  if (status === 'completed') return 3;
  if (status === 'processing') return 2;
  if (status === 'payment_approved') return 1;
  return 0;
}

export default function Tracking() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<OrderOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mpStatus = searchParams.get('status');

  useEffect(() => {
    if (!trackingId) return;

    const fetch = () => {
      getOrder(trackingId)
        .then(setOrder)
        .catch(() => setError('Pedido não encontrado'))
        .finally(() => setLoading(false));
    };

    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [trackingId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-red-400 text-2xl">✕</span>
          </div>
          <p className="text-gray-400 text-lg">{error || 'Pedido não encontrado'}</p>
          <p className="text-gray-600 text-sm mt-2">
            Verifique o código de rastreamento e tente novamente
          </p>
        </div>
      </div>
    );
  }

  const stepIdx = getStepIndex(order.status);
  const isFailed = order.status === 'failed' || order.status === 'cancelled';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* MP return banner */}
        {mpStatus === 'success' && order.status !== 'failed' && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-emerald-400 text-sm font-medium">
              ✓ Pagamento recebido! Seu pedido está sendo processado.
            </p>
          </div>
        )}
        {mpStatus === 'failure' && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm font-medium">
              Pagamento não aprovado. Tente novamente ou use outro método de pagamento.
            </p>
          </div>
        )}
        {mpStatus === 'pending' && (
          <div className="mb-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-yellow-400 text-sm font-medium">
              Pagamento pendente. Assim que for confirmado, seu pedido será processado.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-white">
              Pedido #{order.tracking_id}
            </h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-gray-500 text-sm">
            Criado em {new Date(order.created_at).toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Progress */}
        {!isFailed && (
          <div className="rounded-2xl glass p-8 mb-8">
            <div className="flex items-center justify-between relative">
              {/* Line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-dark-border" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
                style={{ width: `${(stepIdx / (progressSteps.length - 1)) * 100}%` }}
              />

              {progressSteps.map((step, i) => (
                <div key={step.key} className="relative flex flex-col items-center z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      i <= stepIdx
                        ? 'bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-600/25'
                        : 'bg-dark-card border border-dark-border text-gray-600'
                    }`}
                  >
                    {i < stepIdx ? '✓' : i + 1}
                  </div>
                  <span
                    className={`mt-3 text-xs font-medium ${
                      i <= stepIdx ? 'text-purple-400' : 'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl glass p-6">
            <h3 className="text-white font-semibold mb-4">Detalhes do Pedido</h3>
            <div className="space-y-3">
              <Detail label="Serviço" value={order.service_name} />
              <Detail label="Link" value={order.link} isLink />
              <Detail label="Quantidade" value={order.quantity.toLocaleString('pt-BR')} />
              <Detail label="Email" value={order.email} />
            </div>
          </div>

          <div className="rounded-2xl glass p-6">
            <h3 className="text-white font-semibold mb-4">Pagamento</h3>
            <div className="space-y-3">
              <Detail label="Valor" value={`R$ ${parseFloat(order.total_price).toFixed(2)}`} />
              <Detail
                label="Preço unitário"
                value={`R$ ${parseFloat(order.unit_price).toFixed(2)} / 1000`}
              />
              {order.charge && (
                <Detail label="Cobrado" value={`${order.charge} ${order.currency || ''}`} />
              )}
            </div>
          </div>
        </div>

        {/* Live stats */}
        {order.baratosociais_order_id && (
          <div className="rounded-2xl glass p-6 mt-6">
            <h3 className="text-white font-semibold mb-4">Status em Tempo Real</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatBox label="ID do Pedido" value={`#${order.baratosociais_order_id}`} />
              <StatBox label="Início" value={order.start_count || '—'} />
              <StatBox label="Restantes" value={order.remains || '—'} />
              <StatBox label="Status" value={order.status} highlight />
            </div>
            <p className="text-gray-600 text-xs mt-4">
              Atualiza automaticamente a cada 30 segundos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      {isLink && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 truncate max-w-[60%] text-right transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-white text-right max-w-[60%] truncate">{value}</span>
      )}
    </div>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="p-4 rounded-xl bg-dark/50 border border-dark-border text-center">
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className={`font-semibold text-sm ${highlight ? 'text-purple-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}
