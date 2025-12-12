"use client";

import { useState, useEffect, useCallback } from 'react';
import type { ShoppingList, ShoppingItem } from '@/lib/types';
import { seedData } from '@/lib/seed-data';

const LOCAL_STORAGE_KEY = 'shopping-lists';

export const useShoppingLists = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedLists) {
        const parsedLists = JSON.parse(storedLists);
        setLists(parsedLists);
        if (parsedLists.length > 0 && !activeListId) {
          setActiveListId(parsedLists[0].id);
        }
      } else {
        setLists(seedData);
        setActiveListId(seedData[0]?.id || null);
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
      setLists(seedData);
      setActiveListId(seedData[0]?.id || null);
    }
    setIsLoading(false);
  }, []);

  const saveLists = useCallback((updatedLists: ShoppingList[]) => {
    setLists(updatedLists);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, []);

  const addList = useCallback((name: string) => {
    const newList: ShoppingList = {
      id: `list-${Date.now()}`,
      name,
      items: [],
    };
    const updatedLists = [...lists, newList];
    saveLists(updatedLists);
    setActiveListId(newList.id);
  }, [lists, saveLists]);

  const deleteList = useCallback((listId: string) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    saveLists(updatedLists);
    if (activeListId === listId) {
      setActiveListId(updatedLists[0]?.id || null);
    }
  }, [lists, activeListId, saveLists]);

  const switchList = useCallback((listId: string) => {
    setActiveListId(listId);
  }, []);

  const addItem = useCallback((listId: string, itemName: string) => {
    const newItem: ShoppingItem = {
      id: `item-${Date.now()}`,
      name: itemName,
      purchased: false,
    };
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, items: [...list.items, newItem] } : list
    );
    saveLists(updatedLists);
  }, [lists, saveLists]);
  
  const addMultipleItems = useCallback((listId: string, itemNames: string[]) => {
    const newItems: ShoppingItem[] = itemNames.map((name, index) => ({
      id: `item-${Date.now()}-${index}`,
      name,
      purchased: false,
    }));
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, items: [...list.items, ...newItems] } : list
    );
    saveLists(updatedLists);
  }, [lists, saveLists]);

  const updateItem = useCallback((listId: string, itemId: string, updates: Partial<ShoppingItem>) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map((item) =>
              item.id === itemId ? { ...item, ...updates } : item
            ),
          }
        : list
    );
    saveLists(updatedLists);
  }, [lists, saveLists]);

  const deleteItem = useCallback((listId: string, itemId: string) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
        : list
    );
    saveLists(updatedLists);
  }, [lists, saveLists]);

  const reorderItems = useCallback((listId: string, reorderedItems: ShoppingItem[]) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, items: reorderedItems } : list
    );
    saveLists(updatedLists);
  }, [lists, saveLists]);

  const activeList = lists.find((list) => list.id === activeListId);

  return {
    lists,
    activeList,
    activeListId,
    isLoading,
    addList,
    deleteList,
    switchList,
    addItem,
    addMultipleItems,
    updateItem,
    deleteItem,
    reorderItems,
  };
};
