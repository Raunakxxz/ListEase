import type { ShoppingList } from './types';

export const seedData: ShoppingList[] = [
  {
    id: 'list-1',
    name: 'Groceries',
    items: [
      { id: 'item-1-1', name: 'Milk', purchased: false },
      { id: 'item-1-2', name: 'Bread', purchased: true },
      { id: 'item-1-3', name: 'Eggs', purchased: false },
      { id: 'item-1-4', name: 'Cheese', purchased: false },
    ],
  },
  {
    id: 'list-2',
    name: 'Hardware Store',
    items: [
      { id: 'item-2-1', name: 'Screws', purchased: false },
      { id: 'item-2-2', name: 'Wood glue', purchased: false },
      { id: 'item-2-3', name: 'Sandpaper', purchased: true },
    ],
  },
];
