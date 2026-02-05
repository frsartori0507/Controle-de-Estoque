
export type Unit = 'Galões' | 'Litros' | 'Latas' | 'Unidades';
export type TransactionType = 'IN' | 'OUT' | 'RETURN';

export interface PaintItem {
  id: string;
  name: string;
  category: string;
  type: string;
  colorHex: string;
  sku: string;
  quantity: number;
  unit: Unit;
  minStock: number;
}

export interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  type: TransactionType;
  quantity: number;
  unit: Unit;
  responsible: string;
  docNumber: string;
  date: string;
  time: string;
  colorHex: string;
}

export interface StockSummary {
  totalItems: number;
  // Fix: totalVolume added to satisfy the StockSummary implementation in App.tsx
  totalVolume: number;
  lowStockCount: number;
}
