import type { GeneratedDesign } from '../types/design';

export const stylePrompts = [
  'Modern Minimal Interior',
  'Warm Scandinavian Interior',
  'Luxury Hotel Interior',
  'Natural Japandi Interior',
];

export const mockGeneratedDesigns: GeneratedDesign[] = [
  {
    id: 'modern',
    styleName: 'Modern Minimal',
    promptStyle: stylePrompts[0],
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'scandinavian',
    styleName: 'Warm Scandinavian',
    promptStyle: stylePrompts[1],
    imageUrl:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hotel',
    styleName: 'Luxury Hotel',
    promptStyle: stylePrompts[2],
    imageUrl:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'japandi',
    styleName: 'Natural Japandi',
    promptStyle: stylePrompts[3],
    imageUrl:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
  },
];
