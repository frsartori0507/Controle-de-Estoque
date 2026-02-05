
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { INITIAL_PAINTS, INITIAL_TRANSACTIONS } from './constants';
import { PaintItem, Transaction, StockSummary } from './types';

// Pages
import Dashboard from './pages/Dashboard';
import RegisterExit from './pages/RegisterExit';
import RegisterEntry from './pages/RegisterEntry';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import Reports from './pages/Reports';
import Orders from './pages/Orders';
import Settings from './pages/Settings';

// Components
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [paints, setPaints] = useState<PaintItem[]>(INITIAL_PAINTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
    setPaints(prev => prev.map(paint => {
      if (paint.id === transaction.itemId) {
        const factor = (transaction.type === 'IN' || transaction.type === 'RETURN') ? 1 : -1;
        return {
          ...paint,
          quantity: paint.quantity + (transaction.quantity * factor)
        };
      }
      return paint;
    }));
  };

  const addNewPaint = (paint: PaintItem) => {
    setPaints(prev => [paint, ...prev]);
  };

  const updatePaint = (updatedPaint: PaintItem) => {
    setPaints(prev => prev.map(p => p.id === updatedPaint.id ? updatedPaint : p));
  };

  const deletePaint = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item do catálogo?')) {
      setPaints(prev => prev.filter(p => p.id !== id));
    }
  };

  const summary: StockSummary = {
    totalItems: paints.reduce((acc, p) => acc + p.quantity, 0),
    totalVolume: paints.length,
    lowStockCount: paints.filter(p => p.quantity <= p.minStock).length
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-[480px] mx-auto shadow-2xl relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard summary={summary} transactions={transactions} paints={paints} />} />
          <Route path="/register-exit" element={<RegisterExit paints={paints} onSubmit={addTransaction} />} />
          <Route path="/register-entry" element={<RegisterEntry paints={paints} onSubmit={addTransaction} />} />
          <Route path="/add-item" element={<AddItem onSubmit={addNewPaint} />} />
          <Route path="/edit-item/:id" element={<EditItem paints={paints} onSubmit={updatePaint} />} />
          <Route path="/reports" element={<Reports transactions={transactions} paints={paints} onDeletePaint={deletePaint} />} />
          <Route path="/pedidos" element={<Orders paints={paints} />} />
          <Route path="/ajustes" element={<Settings />} />
        </Routes>
        <NavigationController />
      </div>
    </Router>
  );
};

const NavigationController: React.FC = () => {
  const location = useLocation();
  const hideNavPaths = ['/register-exit', '/register-entry', '/add-item', '/edit-item'];
  const shouldHide = hideNavPaths.some(path => location.pathname.startsWith(path));
  if (shouldHide) return null;
  return <BottomNav />;
};

export default App;
