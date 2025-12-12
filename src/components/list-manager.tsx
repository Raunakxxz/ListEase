"use client";

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from './providers/app-provider';
import { Skeleton } from './ui/skeleton';

function ListManager() {
  const { lists, activeListId, switchList, addList, deleteList } = useAppContext();
  const [newListName, setNewListName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddList = () => {
    if (newListName.trim()) {
      addList(newListName.trim());
      setNewListName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>Your Lists</SidebarGroupLabel>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Create new list</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
              <DialogDescription>
                Give your new shopping list a name.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="col-span-3"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddList}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <SidebarMenu>
        {lists.map((list) => (
          <SidebarMenuItem key={list.id} className="group/menu-item">
            <SidebarMenuButton
              onClick={() => switchList(list.id)}
              isActive={list.id === activeListId}
              className="pr-8"
            >
              {list.name}
            </SidebarMenuButton>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover/menu-item:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                deleteList(list.id);
              }}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

ListManager.Skeleton = function ListManagerSkeleton() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <Skeleton className="h-4 w-20" />
            </SidebarGroupLabel>
            <SidebarMenu>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default ListManager;
