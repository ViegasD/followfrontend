import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getService, createOrder } from '../lib/api';
import type { Service } from '../lib/types';

export default function Order() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (!serviceId) return;
    getService(parseInt(serviceId))
      .then(setService)
      .catch(() => setError('Serviço não encontrado'))
      .finally(() => setLoading(false));
  }, [serviceId]);

  const min = service ? parseInt(service.min) : 0;
  const max = service ? parseInt(service.max) : 0;
  const rate = service ? parseFloat(service.rate) : 0;

  const qty = parseInt(quantity) || 0;
  const totalPrice = useMemo(() => {
    if (!qty || !rate) return 0;
    return (rate * qty) / 1000;
  }, [qty, rate]);

  const isCustomComments = service?.type === 'Custom Comments';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setError('');

    if (qty < min || qty > max) {
      setError(`Quantidade deve ser entre ${min} e ${max}`);
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Informe um email válido para receber o código de rastreamento');
      return;
    }

    setSubmitting(true);
    try {
      const extra: Record<string, unknown> = {};
      if (isCustomComments && comments.trim()) {
        extra.comments = comments;
      }

      const result = await createOrder({
        service_id: service.service,
        link,
        quantity: qty,
        email,
        extra_data: Object.keys(extra).length > 0 ? extra : undefined,
      });

      // Redirect to MercadoPago
      window.location.href = result.init_point;
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response: { data: { detail: string } } }).response?.data?.detail
          : 'Erro ao criar pedido. Tente novamente.';
      setError(msg || 'Erro ao criar pedido. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto text-center py-20">
          <p className="text-gray-400 text-lg">{error || 'Serviço não encontrado'}</p>
          <button
            onClick={() => navigate('/servicos')}
            className="mt-4 text-purple-400 hover:text-purple-300 text-sm"
          >
            ← Voltar aos serviços
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/servicos')}
          className="text-gray-500 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition-colors"
        >
          ← Voltar aos serviços
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl glass p-8">
              <h1 className="text-xl font-bold text-white mb-2">{service.name}</h1>
              <div className="flex items-center gap-3 mb-8">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-600/20 text-purple-400">
                  {service.type}
                </span>
                <span className="text-gray-500 text-sm">{service.category}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Link
                  </label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://instagram.com/seu-perfil"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/25 transition-all"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={`Mínimo ${min} — Máximo ${max}`}
                    min={min}
                    max={max}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/25 transition-all"
                  />
                  <div className="mt-2 w-full">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={qty || min}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full h-1 rounded-full appearance-none bg-dark-border accent-purple-500"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>{min.toLocaleString('pt-BR')}</span>
                      <span>{max.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Custom comments */}
                {isCustomComments && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Comentários (um por linha)
                    </label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={4}
                      placeholder={"Ótima foto!\nIncrível 🔥\nParabéns!"}
                      className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/25 transition-all resize-none"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Seu Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/25 transition-all"
                  />
                  <p className="text-gray-600 text-xs mt-1.5">
                    Usado para receber o código de rastreamento do pedido
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !qty || qty < min || qty > max}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-violet-600"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    `Pagar R$ ${totalPrice.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl glass p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-6">Resumo do Pedido</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Serviço</span>
                  <span className="text-white text-right max-w-[60%] truncate">{service.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preço / 1000</span>
                  <span className="text-white">R$ {rate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Quantidade</span>
                  <span className="text-white">{qty ? qty.toLocaleString('pt-BR') : '—'}</span>
                </div>
                {service.refill && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Reposição</span>
                    <span className="text-emerald-400">✓ Incluída</span>
                  </div>
                )}

                <div className="border-t border-white/5 pt-4 mt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-400 font-medium">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-purple-600/5 border border-purple-600/10">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 text-lg">🔒</span>
                  <div>
                    <p className="text-purple-300 text-xs font-medium">Pagamento Seguro</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Processado pelo MercadoPago com criptografia SSL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
