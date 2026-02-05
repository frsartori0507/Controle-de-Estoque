
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Painel', icon: 'dashboard', path: '/' },
    { label: 'Inventário', icon: 'format_paint', path: '/reports' },
    { label: 'Novo', icon: 'add_circle', path: '/add-item', isPrimary: true },
    { label: 'Pedidos', icon: 'receipt_long', path: '/pedidos' },
    { label: 'Ajustes', icon: 'settings', path: '/ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 pb-2 z-50">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-all ${
            item.isPrimary 
              ? 'text-primary' 
              : location.pathname === item.path 
                ? 'text-primary' 
                : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <span 
            className={`material-symbols-outlined text-[26px] ${item.isPrimary ? 'text-primary' : ''}`}
            style={{ 
              fontVariationSettings: (location.pathname === item.path || item.isPrimary) ? "'FILL' 1" : "'FILL' 0"
            }}
          >
            {item.icon}
          </span>
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
