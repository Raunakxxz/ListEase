export type ShoppingItem = {
  id: string;
  name: string;
  purchased: boolean;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: ShoppingItem[];
};
