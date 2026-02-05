
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaintItem, Transaction, TransactionType } from '../types';

interface RegisterEntryProps {
  paints: PaintItem[];
  onSubmit: (t: Transaction) => void;
}

const RegisterEntry: React.FC<RegisterEntryProps> = ({ paints, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemId: '',
    quantity: '',
    responsible: '',
    docNumber: '',
    date: new Date().toISOString().split('T')[0],
    type: 'IN' as TransactionType,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paint = paints.find(p => p.id === formData.itemId);
    if (!paint) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      itemId: paint.id,
      itemName: paint.name,
      type: formData.type,
      quantity: Number(formData.quantity),
      unit: paint.unit,
      responsible: formData.responsible,
      docNumber: formData.docNumber,
      date: formData.date,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      colorHex: paint.colorHex
    };

    onSubmit(newTransaction);
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between">
          <div onClick={() => navigate(-1)} className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-start cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Registrar Movimentação</h2>
          <div className="flex w-10 items-center justify-end">
            <button onClick={() => navigate(-1)} className="text-primary text-base font-semibold leading-normal hover:opacity-80">Cancelar</button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="mt-4">
          <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4">Detalhes da Tinta</h3>
          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Tipo de Tinta</p>
              <select 
                required
                className="form-select flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 px-4 text-base font-normal focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
                value={formData.itemId}
                onChange={(e) => setFormData({...formData, itemId: e.target.value})}
              >
                <option disabled value="">Selecione o tipo de tinta</option>
                {paints.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4">Logística</h3>
          <div className="px-4 py-3">
            <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Tipo de Registro</p>
            <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl">
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'IN'})}
                className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${formData.type === 'IN' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Entrada
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, type: 'RETURN'})}
                className={`flex-1 text-center py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${formData.type === 'RETURN' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Devolução
              </button>
            </div>
          </div>
          
          <div className="flex px-4 py-3 gap-4">
            <label className="flex flex-col flex-1">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Quantidade ({paints.find(p => p.id === formData.itemId)?.unit || 'Un'})</p>
              <input 
                required
                className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 px-4 text-base font-normal focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400" 
                placeholder="0" 
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              />
            </label>
            <label className="flex flex-col flex-1">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Data</p>
              <input 
                required
                className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 px-4 text-base font-normal focus:ring-2 focus:ring-primary focus:border-primary" 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </label>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Nº do Documento</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">description</span>
                </span>
                <input 
                  required
                  className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 pl-11 pr-4 text-base font-normal focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400" 
                  placeholder="NF-2023-XXXX" 
                  type="text"
                  value={formData.docNumber}
                  onChange={(e) => setFormData({...formData, docNumber: e.target.value})}
                />
              </div>
            </label>
          </div>

          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Responsável pelo Lançamento</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </span>
                <input 
                  required
                  className="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 pl-11 pr-4 text-base font-normal focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400" 
                  placeholder="Nome do usuário" 
                  type="text"
                  value={formData.responsible}
                  onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="px-4 py-3 mb-8">
          <label className="flex flex-col w-full">
            <p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Observações (Opcional)</p>
            <textarea 
              className="form-textarea flex w-full rounded-lg text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 min-h-[100px] p-4 text-base font-normal focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400" 
              placeholder="Adicione instruções especiais ou motivo da devolução..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </label>
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
        <button onClick={handleSubmit} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">save</span>
          Salvar Registro
        </button>
      </footer>
    </div>
  );
};

export default RegisterEntry;
