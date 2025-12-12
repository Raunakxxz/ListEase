import { CheckSquare } from 'lucide-react';

export default function ListEaseLogo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <CheckSquare className="h-7 w-7 text-primary" />
      <h2 className="text-xl font-bold tracking-tight text-foreground font-headline">
        ListEase
      </h2>
    </div>
  );
}
