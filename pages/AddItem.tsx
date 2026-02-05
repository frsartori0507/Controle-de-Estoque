
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaintItem, Unit } from '../types';

interface AddItemProps {
  onSubmit: (p: PaintItem) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: '',
    colorHex: '#137fec',
    quantity: '0',
    unit: 'Galões' as Unit,
    minStock: '10'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPaint: PaintItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      type: formData.type,
      colorHex: formData.colorHex,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      minStock: Number(formData.minStock)
    };

    onSubmit(newPaint);
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between h-14">
          <button onClick={() => navigate(-1)} className="text-primary flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1">
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>
          <h1 className="text-[#0d141b] dark:text-white text-lg font-semibold tracking-tight flex-1 text-center">Cadastrar Item</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-32">
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Informações Básicas</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-1 space-y-1">
            <div className="p-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome ou Marca da Tinta</label>
              <input 
                required
                className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base placeholder-gray-400" 
                placeholder="Ex: Coral Premium Acetinado" 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 mx-3"></div>
            <div className="p-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Categoria</label>
              <input 
                required
                className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base placeholder-gray-400" 
                placeholder="Ex: Alvenaria / Parede Interna" 
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Especificações Técnicas</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-1 space-y-1">
            <div className="p-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tipo de Tinta</label>
              <div className="relative">
                <select 
                  required
                  className="w-full h-12 appearance-none bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base px-3"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option disabled value="">Selecione o tipo</option>
                  <option value="acrilica">Acrílica</option>
                  <option value="oleo">À Óleo</option>
                  <option value="latex">Látex (PVA)</option>
                  <option value="esmalte">Esmalte Sintético</option>
                  <option value="epoxi">Epóxi</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">unfold_more</span>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 mx-3"></div>
            <div className="p-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cor / Código Hex</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    required
                    className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base placeholder-gray-400" 
                    placeholder="#FFFFFF ou Nome da Cor" 
                    type="text"
                    value={formData.colorHex}
                    onChange={(e) => setFormData({...formData, colorHex: e.target.value})}
                  />
                </div>
                <div className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full" style={{ backgroundColor: formData.colorHex }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">Controle de Estoque</h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-1">
            <div className="grid grid-cols-2 gap-px bg-gray-100 dark:bg-gray-800">
              <div className="bg-white dark:bg-gray-900 p-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Qtd. Inicial</label>
                <input 
                  className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base" 
                  placeholder="0" 
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                />
              </div>
              <div className="bg-white dark:bg-gray-900 p-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Unidade</label>
                <div className="relative">
                  <select 
                    className="w-full h-12 appearance-none bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base px-3"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value as Unit})}
                  >
                    <option value="Litros">Litros (L)</option>
                    <option value="Unidades">Unidades</option>
                    <option value="Galões">Galões</option>
                    <option value="Latas">Latas</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">unfold_more</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 mx-3"></div>
            <div className="p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Estoque Mínimo para Alerta</label>
                <span className="material-symbols-outlined text-amber-500 text-sm">warning</span>
              </div>
              <input 
                className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 text-base" 
                placeholder="Ex: 5" 
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: e.target.value})}
              />
              <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">O sistema notificará quando o estoque atingir este nível.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 max-w-[480px] mx-auto">
        <button onClick={handleSubmit} className="w-full h-14 bg-primary text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg shadow-primary/25">
          <span className="material-symbols-outlined">inventory_2</span>
          Cadastrar Item de Tinta
        </button>
      </footer>
    </div>
  );
};

export default AddItem;
