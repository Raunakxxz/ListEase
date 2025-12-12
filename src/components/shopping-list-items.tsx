"use client";

import React, { useState, useRef } from 'react';
import type { ShoppingList, ShoppingItem } from '@/lib/types';
import { useAppContext } from './providers/app-provider';
import ShoppingListItem from './shopping-list-item';

interface ShoppingListItemsProps {
  list: ShoppingList;
}

export default function ShoppingListItems({ list }: ShoppingListItemsProps) {
  const { reorderItems } = useAppContext();
  const [items, setItems] = useState(list.items);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  React.useEffect(() => {
    setItems(list.items);
  }, [list.items]);
  
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
    const newItems = [...items];
    const draggedItemContent = newItems.splice(dragItem.current!, 1)[0];
    newItems.splice(dragOverItem.current!, 0, draggedItemContent);
    dragItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setItems(newItems);
  };

  const handleDragEnd = () => {
    reorderItems(list.id, items);
    dragItem.current = null;
  };

  if (items.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Your list is empty. Add some items to get started!
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => {
    if (a.purchased === b.purchased) return 0;
    return a.purchased ? 1 : -1;
  });


  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
        >
          <ShoppingListItem listId={list.id} item={item} />
        </div>
      ))}
    </div>
  );
}
