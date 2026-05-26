export type DesignStyleId = 'modern' | 'scandinavian' | 'hotel' | 'japandi';

export interface ShoppingItem {
  name: string;
  category: string;
  price: string;
  matchReason: string;
}

export interface GeneratedDesign {
  id: DesignStyleId;
  styleName: string;
  promptStyle: string;
  imageUrl: string;
  audience: string;
  budgetRange: string;
  valueLift: string;
  listingHeadline: string;
  listingCopy: string;
  roiNotes: string[];
  shoppingItems: ShoppingItem[];
}
