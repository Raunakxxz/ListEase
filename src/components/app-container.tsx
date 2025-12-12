"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import ListManager from '@/components/list-manager';
import ShoppingListView from '@/components/shopping-list-view';
import { useAppContext } from './providers/app-provider';
import ListEaseLogo from './list-ease-logo';
import { Skeleton } from './ui/skeleton';

export default function AppContainer() {
  const { isLoading } = useAppContext();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <ListEaseLogo />
        </SidebarHeader>
        <SidebarContent>
          {isLoading ? <ListManager.Skeleton /> : <ListManager />}
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">My Shopping List</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {isLoading ? <ShoppingListView.Skeleton /> : <ShoppingListView />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
