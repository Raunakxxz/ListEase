"use client";

import { cva, type VariantProps } from 'class-variance-authority';
import { GripVertical, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { ShoppingItem } from '@/lib/types';
import { useAppContext } from './providers/app-provider';

const itemVariants = cva(
  'flex items-center gap-3 rounded-lg p-3 transition-all duration-300',
  {
    variants: {
      purchased: {
        true: 'bg-muted text-muted-foreground',
        false: 'bg-card hover:bg-secondary/50',
      },
    },
    defaultVariants: {
      purchased: false,
    },
  }
);

interface ShoppingListItemProps extends VariantProps<typeof itemVariants> {
  listId: string;
  item: ShoppingItem;
}

export default function ShoppingListItem({ listId, item }: ShoppingListItemProps) {
  const { updateItem, deleteItem } = useAppContext();

  return (
    <div className={cn(itemVariants({ purchased: item.purchased }))} draggable>
        <div className="cursor-grab text-muted-foreground" aria-label="Drag to reorder">
            <GripVertical className="h-5 w-5" />
        </div>
      
      <Checkbox
        id={`item-${item.id}`}
        checked={item.purchased}
        onCheckedChange={(checked) =>
          updateItem(listId, item.id, { purchased: !!checked })
        }
        className="h-5 w-5"
      />
      <label
        htmlFor={`item-${item.id}`}
        className={cn(
          'flex-1 cursor-pointer text-sm font-medium transition-all',
          item.purchased && 'line-through'
        )}
      >
        {item.name}
      </label>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => deleteItem(listId, item.id)}
        aria-label={`Delete ${item.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
