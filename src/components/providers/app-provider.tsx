"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useShoppingLists } from '@/hooks/use-shopping-lists';

type AppContextType = ReturnType<typeof useShoppingLists>;

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const shoppingListState = useShoppingLists();
  return (
    <AppContext.Provider value={shoppingListState}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
