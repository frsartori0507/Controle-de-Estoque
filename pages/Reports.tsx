
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction, PaintItem } from '../types';

interface Props {
  transactions: Transaction[];
  paints: PaintItem[];
  onDeletePaint: (id: string) => void;
}

const Reports: React.FC<Props> = ({ transactions, paints, onDeletePaint }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'MOV' | 'CAT'>('MOV');
  const [filter, setFilter] = useState<'ALL' | 'IN' | 'OUT'>('ALL');

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'ALL') return true;
    if (filter === 'IN') return t.type === 'IN' || t.type === 'RETURN';
    return t.type === 'OUT';
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <header className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Inventário</h2>
          <button className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
          </button>
        </div>
        
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button 
            onClick={() => setActiveTab('MOV')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'MOV' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Movimentações
          </button>
          <button 
            onClick={() => setActiveTab('CAT')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'CAT' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Catálogo
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 pb-32 space-y-3">
        {activeTab === 'MOV' ? (
          <>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {['ALL', 'IN', 'OUT'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase whitespace-nowrap transition-colors ${
                    filter === f ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  {f === 'ALL' ? 'Todos' : f === 'IN' ? 'Entradas' : 'Saídas'}
                </button>
              ))}
            </div>

            {filteredTransactions.map(t => (
              <div key={t.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-slate-50 dark:border-slate-700 shadow-sm">
                <div className={`size-12 rounded-xl flex items-center justify-center ${
                  (t.type === 'IN' || t.type === 'RETURN') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  <span className="material-symbols-outlined">
                    {(t.type === 'IN' || t.type === 'RETURN') ? 'download' : 'upload'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{t.itemName}</p>
                  <p className="text-[10px] text-slate-400 font-bold">DOC: {t.docNumber} • {t.time}</p>
                </div>
                <div className="text-right">
                  <p className={`text-base font-black ${ (t.type === 'IN' || t.type === 'RETURN') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    { (t.type === 'IN' || t.type === 'RETURN') ? '+' : '-'}{t.quantity}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">{t.unit}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="space-y-3">
            {paints.map(p => (
              <div key={p.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="size-12 rounded-xl flex-shrink-0 border-2 border-slate-50" style={{ backgroundColor: p.colorHex }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{p.category} • {p.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-primary leading-none">{p.quantity}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{p.unit}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-slate-50 dark:border-slate-800">
                  <button 
                    onClick={() => navigate(`/edit-item/${p.id}`)}
                    className="flex-1 h-10 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span> Editar
                  </button>
                  <button 
                    onClick={() => onDeletePaint(p.id)}
                    className="flex-1 h-10 bg-rose-50 text-rose-500 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span> Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Reports;
