
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaintItem, Transaction } from '../types';

interface Props {
  paints: PaintItem[];
  onSubmit: (t: Transaction) => void;
}

const RegisterExit: React.FC<Props> = ({ paints, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemId: '',
    quantity: '',
    responsible: '',
    docNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paint = paints.find(p => p.id === formData.itemId);
    if (!paint) return;

    onSubmit({
      id: Date.now().toString(),
      itemId: paint.id,
      itemName: paint.name,
      type: 'OUT',
      quantity: Number(formData.quantity),
      unit: paint.unit,
      responsible: formData.responsible,
      docNumber: formData.docNumber,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      colorHex: paint.colorHex
    });
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined text-slate-500">arrow_back</button>
        <h2 className="font-bold text-lg">Retirada de Material</h2>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-6">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Produto</label>
          <div className="relative">
            <select 
              required
              className="w-full h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary appearance-none"
              value={formData.itemId}
              onChange={e => setFormData({...formData, itemId: e.target.value})}
            >
              <option value="">Selecione a tinta...</option>
              {paints.map(p => <option key={p.id} value={p.id}>{p.name} ({p.quantity} {p.unit})</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Quantidade</label>
          <input 
            required
            type="number"
            placeholder="0.00"
            className="w-full h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary"
            value={formData.quantity}
            onChange={e => setFormData({...formData, quantity: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Responsável</label>
            <input 
              required
              placeholder="Nome"
              className="w-full h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary"
              value={formData.responsible}
              onChange={e => setFormData({...formData, responsible: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Nº Pedido/Doc</label>
            <div className="relative">
              <input 
                required
                placeholder="0000"
                className="w-full h-14 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-primary"
                value={formData.docNumber}
                onChange={e => setFormData({...formData, docNumber: e.target.value})}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <span className="material-symbols-outlined">barcode_scanner</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <button onClick={handleSubmit} className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform">
          Confirmar Baixa de Estoque
        </button>
      </div>
    </div>
  );
};

export default RegisterExit;
