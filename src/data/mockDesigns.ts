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
    audience: 'Urban buyers',
    budgetRange: '$1,200 - $3,800',
    valueLift: '+7% perceived value',
    listingHeadline: 'A brighter, calmer living space made for modern city life.',
    listingCopy:
      'This redesign keeps the original footprint while making the room feel more open, refined, and move-in ready. Clean-lined furniture, lighter textiles, and focused lighting help buyers imagine a premium daily routine.',
    roiNotes: ['Paint and lighting create the fastest visual lift.', 'Low-profile furniture makes the room photograph larger.', 'Neutral styling works across the widest buyer group.'],
    shoppingItems: [
      { name: 'Low profile cream sofa', category: 'Sofa', price: '$899', matchReason: 'Keeps sightlines open' },
      { name: 'Matte black floor lamp', category: 'Lighting', price: '$180', matchReason: 'Adds contrast and polish' },
      { name: 'Textured ivory rug', category: 'Rug', price: '$260', matchReason: 'Softens the minimal palette' },
    ],
  },
  {
    id: 'scandinavian',
    styleName: 'Warm Scandinavian',
    promptStyle: stylePrompts[1],
    imageUrl:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    audience: 'Family buyers',
    budgetRange: '$950 - $2,900',
    valueLift: '+11% listing warmth',
    listingHeadline: 'A warm, welcoming room that feels instantly livable.',
    listingCopy:
      'Natural woods, soft lighting, and cozy layered textiles make the space feel approachable without looking cluttered. This is a strong option for listings that need emotional warmth and everyday practicality.',
    roiNotes: ['Warm materials increase dwell-time on listing photos.', 'Family-friendly styling makes the room feel usable.', 'Soft contrast hides older finishes better than stark white.'],
    shoppingItems: [
      { name: 'Oak round coffee table', category: 'Table', price: '$320', matchReason: 'Adds natural warmth' },
      { name: 'Boucle accent chair', category: 'Chair', price: '$420', matchReason: 'Creates a cozy reading corner' },
      { name: 'Linen curtain set', category: 'Window', price: '$140', matchReason: 'Improves daylight softness' },
    ],
  },
  {
    id: 'hotel',
    styleName: 'Luxury Hotel',
    promptStyle: stylePrompts[2],
    imageUrl:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80',
    audience: 'Premium buyers',
    budgetRange: '$2,800 - $7,500',
    valueLift: '+14% premium signal',
    listingHeadline: 'Hotel-inspired staging that turns the room into a luxury moment.',
    listingCopy:
      'The layout stays familiar, but richer materials, layered lighting, and statement accents create a boutique-hotel feel. Use this look when the listing needs to justify a premium impression in the first photo swipe.',
    roiNotes: ['Statement lighting is the hero upgrade.', 'Darker accents add perceived luxury in photos.', 'Best fit for high-ticket listings or short-term rentals.'],
    shoppingItems: [
      { name: 'Brass globe chandelier', category: 'Lighting', price: '$620', matchReason: 'Creates luxury focal point' },
      { name: 'Velvet lounge chair', category: 'Chair', price: '$780', matchReason: 'Adds boutique hotel texture' },
      { name: 'Marble side table', category: 'Table', price: '$360', matchReason: 'Signals premium finish' },
    ],
  },
  {
    id: 'japandi',
    styleName: 'Natural Japandi',
    promptStyle: stylePrompts[3],
    imageUrl:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
    audience: 'Design-conscious renters',
    budgetRange: '$1,500 - $4,400',
    valueLift: '+9% calm factor',
    listingHeadline: 'A quiet, natural retreat with intentional simplicity.',
    listingCopy:
      'Japandi styling turns the room into a calm retreat while preserving the original architecture. Organic textures, grounded furniture, and a restrained palette help the space feel curated and peaceful.',
    roiNotes: ['Organic texture makes simple rooms feel designed.', 'Great for wellness-focused Airbnb positioning.', 'Works well when the room has good natural light.'],
    shoppingItems: [
      { name: 'Walnut platform console', category: 'Storage', price: '$540', matchReason: 'Grounds the room visually' },
      { name: 'Paper shade pendant', category: 'Lighting', price: '$210', matchReason: 'Adds soft ambient glow' },
      { name: 'Woven jute rug', category: 'Rug', price: '$190', matchReason: 'Adds natural texture' },
    ],
  },
];
