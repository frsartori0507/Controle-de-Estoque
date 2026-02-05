
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockSummary, Transaction, PaintItem } from '../types';
import { analyzeInventory } from '../geminiService';

interface DashboardProps {
  summary: StockSummary;
  transactions: Transaction[];
  paints: PaintItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ summary, transactions, paints }) => {
  const navigate = useNavigate();
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    setLoading(true);
    const result = await analyzeInventory(paints, transactions);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
      <header className="p-4 flex justify-between items-center sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined">format_paint</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">PaintFlow</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Stock Control</p>
          </div>
        </div>
        <button className="size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="material-symbols-outlined text-slate-500">notifications</span>
        </button>
      </header>

      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total em Estoque</p>
          <p className="text-2xl font-black text-primary">{summary.totalItems}</p>
          <div className="mt-2 flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 w-fit px-1.5 py-0.5 rounded">
            <span className="material-symbols-outlined text-xs">trending_up</span> 8%
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Estoque Crítico</p>
          <p className="text-2xl font-black text-amber-500">{summary.lowStockCount}</p>
          <button onClick={handleAI} className="mt-2 text-[10px] font-bold text-primary underline">
            {loading ? 'Analisando...' : 'Pedir Ajuda à IA'}
          </button>
        </div>
      </div>

      {insight && (
        <div className="mx-4 p-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl mb-6 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
            <span className="text-xs font-bold uppercase text-primary">Insights do Gemini</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Alertas:</p>
              <p className="text-xs text-slate-700 dark:text-slate-300">{insight.alerts?.join(', ') || 'Nenhum alerta crítico.'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Tendência:</p>
              <p className="text-xs italic text-slate-700 dark:text-slate-300">"{insight.trend}"</p>
            </div>
          </div>
          <button onClick={() => setInsight(null)} className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Fechar</button>
        </div>
      )}

      <div className="px-4 mb-4">
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-slate-400">Próximo Pedido Estimado</p>
            <p className="text-lg font-bold">14 de Outubro</p>
          </div>
          <button className="bg-primary px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-primary/40">Ver Detalhes</button>
        </div>
      </div>

      <div className="px-4 mb-4 flex gap-3">
        <button onClick={() => navigate('/register-entry')} className="flex-1 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-emerald-500">add_circle</span>
          <span className="font-bold text-sm">Entrada</span>
        </button>
        <button onClick={() => navigate('/register-exit')} className="flex-1 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-rose-500">remove_circle</span>
          <span className="font-bold text-sm">Saída</span>
        </button>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 dark:text-white">Movimentações Recentes</h3>
          <button onClick={() => navigate('/reports')} className="text-xs text-primary font-bold">Ver Todos</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map(t => (
            <div key={t.id} className="bg-white dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="size-10 rounded-lg flex-shrink-0 border-2 border-slate-50 dark:border-slate-900" style={{ backgroundColor: t.colorHex }}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{t.itemName}</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium">{t.responsible} • {t.time}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${t.type === 'OUT' ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {t.type === 'OUT' ? '-' : '+'}{t.quantity}
                </p>
                <p className="text-[10px] text-slate-400 font-bold">{t.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
