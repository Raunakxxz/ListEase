"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppContext } from './providers/app-provider';
import AddItemForm from './add-item-form';
import ShoppingListItems from './shopping-list-items';
import AiSuggestions from './ai-suggestions';
import { Skeleton } from './ui/skeleton';

function ShoppingListView() {
  const { activeList } = useAppContext();

  if (!activeList) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">No list selected</h2>
        <p className="text-muted-foreground">
          Create or select a list from the sidebar to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="font-headline text-2xl">{activeList.name}</CardTitle>
          <AiSuggestions />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AddItemForm listId={activeList.id} />
            <ShoppingListItems list={activeList} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

ShoppingListView.Skeleton = function ShoppingListViewSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}

export default ShoppingListView;
