
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PaintItem, Unit } from '../types';

interface EditItemProps {
  paints: PaintItem[];
  onSubmit: (p: PaintItem) => void;
}

const EditItem: React.FC<EditItemProps> = ({ paints, onSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const paint = paints.find(p => p.id === id);
    if (paint) {
      setFormData({
        ...paint,
        quantity: paint.quantity.toString(),
        minStock: paint.minStock.toString()
      });
    } else {
      navigate('/reports');
    }
  }, [id, paints, navigate]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPaint: PaintItem = {
      ...formData,
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock)
    };

    onSubmit(updatedPaint);
    navigate('/reports');
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between h-14">
          <button onClick={() => navigate(-1)} className="text-primary flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1">
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>
          <h1 className="text-[#0d141b] dark:text-white text-lg font-semibold tracking-tight flex-1 text-center">Editar Item</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32">
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Informações do Produto</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-1 space-y-1">
            <div className="p-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome ou Marca</label>
              <input 
                required
                className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base" 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="p-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Categoria</label>
              <input 
                required
                className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base" 
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Configurações de Alerta</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Estoque Mínimo</label>
            <input 
              className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base" 
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({...formData, minStock: e.target.value})}
            />
            <p className="mt-2 text-[11px] text-gray-500">Alerte quando o estoque for menor ou igual a este valor.</p>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 max-w-[480px] mx-auto">
        <button onClick={handleSubmit} className="w-full h-14 bg-primary text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg shadow-primary/25">
          <span className="material-symbols-outlined">save</span>
          Salvar Alterações
        </button>
      </footer>
    </div>
  );
};

export default EditItem;
