
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PaintItem } from '../types';

interface Props {
  paints: PaintItem[];
}

const Orders: React.FC<Props> = ({ paints }) => {
  const navigate = useNavigate();
  const lowStockItems = paints.filter(p => p.quantity <= p.minStock);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <header className="p-4 flex items-center gap-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined text-slate-500">arrow_back</button>
        <h2 className="font-bold text-lg">Pedidos de Compra</h2>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-32 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sugestões de Reposição</h3>
            <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded-full">
              {lowStockItems.length} itens críticos
            </span>
          </div>
          <div className="space-y-3">
            {lowStockItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-[10px] text-amber-500 font-bold">Estoque crítico: {item.quantity}</p>
                </div>
                <button className="bg-primary text-white h-9 px-4 rounded-xl text-[11px] font-black active:scale-95 transition-transform uppercase">
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-3">Histórico de Pedidos</h3>
          <div className="space-y-4">
            {[
              { id: '102', provider: 'Suvinil Distribuidora', date: '02/10/2023', status: 'PENDENTE', total: 'R$ 1.240,00' },
              { id: '101', provider: 'Tintas Coral S.A.', date: '28/09/2023', status: 'RECEBIDO', total: 'R$ 850,00' }
            ].map(order => (
              <div key={order.id} className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400">ORD-{order.id}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{order.provider}</p>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-1 rounded-lg ${
                    order.status === 'PENDENTE' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                  <div className="flex gap-2">
                    <button className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary border border-slate-100 dark:border-slate-700">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button className="size-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-400 hover:text-rose-600 border border-rose-100">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-medium">{order.date}</p>
                    <p className="text-sm font-black text-primary">{order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4">
        <button className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">add_circle</span>
          Novo Pedido
        </button>
      </div>
    </div>
  );
};

export default Orders;
