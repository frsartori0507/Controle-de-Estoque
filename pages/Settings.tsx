
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Conta e Perfil',
      items: [
        { label: 'Meus Dados', icon: 'person', color: 'bg-blue-500' },
        { label: 'Segurança', icon: 'lock', color: 'bg-slate-500' }
      ]
    },
    {
      title: 'Preferências',
      items: [
        { label: 'Notificações', icon: 'notifications', color: 'bg-amber-500' },
        { label: 'Unidades de Medida', icon: 'straighten', color: 'bg-emerald-500' }
      ]
    },
    {
      title: 'Sistema',
      items: [
        { label: 'Exportar Backup', icon: 'database', color: 'bg-indigo-500' },
        { label: 'Limpar Cache', icon: 'mop', color: 'bg-rose-500' },
        { label: 'Sobre o App', icon: 'info', color: 'bg-slate-400' }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      <header className="p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Ajustes</h2>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Configurações Gerais</p>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="p-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
              <span className="material-symbols-outlined text-4xl">account_circle</span>
            </div>
            <div>
              <p className="text-lg font-bold">Gilson_ Estoque</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Administrador Master</p>
              <button className="text-primary text-[10px] font-black uppercase mt-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">Editar Perfil</button>
            </div>
          </div>
        </div>

        <div className="px-4 space-y-6">
          {sections.map(section => (
            <div key={section.title}>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">{section.title}</h3>
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                {section.items.map((item, idx) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800 transition-colors ${
                      idx !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-sm shadow-black/10`}>
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 mt-6">
          <button className="w-full h-14 border-2 border-rose-500/10 text-rose-500 bg-rose-50/50 rounded-2xl font-bold flex items-center justify-center gap-2 active:bg-rose-50 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            Sair da Conta
          </button>
          <div className="mt-8 text-center space-y-1">
            <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">PaintFlow v1.2.0-PRO</p>
            <p className="text-[9px] text-slate-200 font-bold uppercase">Feito para controle de alta performance</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
