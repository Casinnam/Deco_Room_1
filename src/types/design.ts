export type DesignStyleId = 'modern' | 'scandinavian' | 'hotel' | 'japandi';

export interface GeneratedDesign {
  id: DesignStyleId;
  styleName: string;
  promptStyle: string;
  imageUrl: string;
}
