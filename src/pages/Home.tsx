import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../lib/api';
import type { ServiceCategory } from '../lib/types';
import ServiceCard from '../components/ServiceCard';
import Aurora from '../components/Aurora';

const steps = [
  {
    num: '01',
    title: 'Escolha o Serviço',
    desc: 'Navegue pelo nosso catálogo e escolha o serviço ideal para suas redes sociais.',
  },
  {
    num: '02',
    title: 'Faça o Pagamento',
    desc: 'Pague com segurança pelo MercadoPago. Aceitamos Pix, cartão e boleto.',
  },
  {
    num: '03',
    title: 'Receba os Resultados',
    desc: 'Seu pedido é processado automaticamente. Acompanhe o progresso em tempo real.',
  },
];

const faqs = [
  {
    q: 'Quanto tempo leva para entregar?',
    a: 'O tempo de entrega varia de acordo com o serviço, mas a maioria dos pedidos começa a ser processada em poucos minutos após a confirmação do pagamento.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos Pix, cartão de crédito, cartão de débito e boleto bancário através do MercadoPago.',
  },
  {
    q: 'É seguro usar o serviço?',
    a: 'Sim! Utilizamos métodos seguros que seguem as diretrizes de cada plataforma. Seus dados de pagamento são protegidos pelo MercadoPago.',
  },
  {
    q: 'Como acompanho meu pedido?',
    a: 'Após o pagamento, você recebe um código de rastreamento. Use-o na página "Rastrear Pedido" para ver o status em tempo real.',
  },
  {
    q: 'E se meu pedido não for entregue completamente?',
    a: 'Serviços com reposição oferecem reenvio automático. Para qualquer problema, entre em contato pelo WhatsApp.',
  },
];

export default function Home() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    getServices().then(setCategories).catch(() => {});
  }, []);

  const popularServices = categories
    .flatMap((c) => c.services)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#7c3aed", "#a855f7", "#6d28d9", "#4c1d95"]}
            blend={0.5}
            amplitude={1.2}
            speed={0.5}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-medium">Serviços ativos 24/7</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Impulsione suas{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              redes sociais
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Seguidores, curtidas, visualizações e muito mais. Entrega rápida,
            preços imbatíveis e pagamento seguro com MercadoPago.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/servicos"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-0.5"
            >
              Ver Serviços
            </Link>
            <Link
              to="/rastrear"
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-medium text-lg hover:bg-white/5 transition-all duration-300"
            >
              Rastrear Pedido
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Como funciona
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Três passos simples para impulsionar suas redes sociais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-dark-card border border-dark-border p-8 group hover:-translate-y-1 hover:border-purple-600/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-purple-600/15 flex items-center justify-center shrink-0">
                    <span className="text-purple-400 font-bold text-sm">{step.num}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base">{step.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular services */}
      {popularServices.length > 0 && (
        <section className="py-24 px-6 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Serviços populares
                </h2>
                <p className="text-gray-500">Os mais procurados pelos nossos clientes</p>
              </div>
              <Link
                to="/servicos"
                className="hidden sm:inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
              >
                Ver todos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularServices.map((s) => (
                <ServiceCard key={s.service} service={s} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/servicos"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Ver todos os serviços →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              { value: '100K+', label: 'Pedidos entregues' },
              { value: '50+', label: 'Serviços disponíveis' },
              { value: '24/7', label: 'Suporte ativo' },
              { value: '99%', label: 'Satisfação' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-dark-card border border-dark-border">
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-gray-500">Tire suas dúvidas antes de comprar</p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl bg-dark-card border border-dark-border"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  <span className={`text-purple-400 text-xl transition-transform duration-200 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-200 ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-600/10 p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para começar?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Escolha seu serviço e veja os resultados em minutos. Pagamento rápido e seguro.
            </p>
            <Link
              to="/servicos"
              className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-purple-600/25"
            >
              Explorar Serviços
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
