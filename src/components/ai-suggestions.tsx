"use client";

import { useState } from 'react';
import { Sparkles, Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { getAiSuggestions } from '@/app/actions';
import { useAppContext } from './providers/app-provider';
import { Separator } from './ui/separator';

export default function AiSuggestions() {
  const { lists, activeList, addMultipleItems } = useAppContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleFetchSuggestions = async () => {
    if (!activeList) return;
    setIsLoading(true);
    setSuggestions([]);
    try {
      const pastShoppingLists = lists
        .filter(list => list.id !== activeList.id)
        .map(list => list.items.map(item => item.name).join(', '));
      
      const result = await getAiSuggestions({ pastShoppingLists });
      
      if (result.suggestedItems && result.suggestedItems.length > 0) {
        setSuggestions(result.suggestedItems);
      } else {
        toast({
          title: 'No suggestions',
          description: "We couldn't find any suggestions for you right now.",
        });
      }
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get suggestions. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuggestion = (item: string) => {
    if (!activeList) return;
    addMultipleItems(activeList.id, [item]);
    setSuggestions(prev => prev.filter(s => s !== item));
    toast({
        title: "Item added",
        description: `"${item}" has been added to your list.`,
    })
  };

  const handleAddAll = () => {
    if (!activeList || suggestions.length === 0) return;
    addMultipleItems(activeList.id, suggestions);
    toast({
        title: "All items added",
        description: `${suggestions.length} items have been added to your list.`,
    })
    setSuggestions([]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleFetchSuggestions} variant="outline" className="bg-accent/50 hover:bg-accent">
          <Sparkles className="mr-2 h-4 w-4" />
          Smart Suggestions
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>AI-Powered Suggestions</SheetTitle>
          <SheetDescription>
            Here are some items you might want to add, based on your shopping habits.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-3">
                <Button onClick={handleAddAll} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add All to List
                </Button>
                <Separator />
              <ul className="space-y-2">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md bg-secondary/50"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleAddSuggestion(item)}
                      aria-label={`Add ${item} to list`}
                    >
                      <PlusCircle className="h-5 w-5 text-primary" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center text-muted-foreground pt-10">
              Click the button again to get suggestions.
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
