"use client";

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from './providers/app-provider';

interface AddItemFormProps {
  listId: string;
}

export default function AddItemForm({ listId }: AddItemFormProps) {
  const [itemName, setItemName] = useState('');
  const { addItem } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      addItem(listId, itemName.trim());
      setItemName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add an item..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="text-base"
      />
      <Button type="submit" size="icon" aria-label="Add item">
        <PlusCircle className="h-5 w-5" />
      </Button>
    </form>
  );
}
