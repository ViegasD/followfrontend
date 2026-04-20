const statusMap: Record<string, { label: string; color: string }> = {
  pending_payment: { label: 'Aguardando Pagamento', color: 'bg-yellow-400/10 text-yellow-400' },
  payment_approved: { label: 'Pagamento Aprovado', color: 'bg-blue-400/10 text-blue-400' },
  processing: { label: 'Processando', color: 'bg-purple-400/10 text-purple-400' },
  completed: { label: 'Concluído', color: 'bg-emerald-400/10 text-emerald-400' },
  partial: { label: 'Parcial', color: 'bg-orange-400/10 text-orange-400' },
  cancelled: { label: 'Cancelado', color: 'bg-red-400/10 text-red-400' },
  failed: { label: 'Falhou', color: 'bg-red-400/10 text-red-400' },
};

export default function StatusBadge({ status }: { status: string }) {
  const info = statusMap[status] || { label: status, color: 'bg-gray-400/10 text-gray-400' };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${info.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
        status === 'processing' ? 'animate-pulse bg-purple-400' :
        status === 'completed' ? 'bg-emerald-400' :
        status === 'failed' || status === 'cancelled' ? 'bg-red-400' :
        'bg-current'
      }`} />
      {info.label}
    </span>
  );
}
