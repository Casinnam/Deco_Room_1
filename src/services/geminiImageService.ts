import { mockGeneratedDesigns, stylePrompts } from '../data/mockDesigns';
import type { GeneratedDesign } from '../types/design';

const MODEL_NAME = 'gemini-3-pro-image-preview';

const buildInteriorPrompt = (style: string) => `
Generate a photorealistic high-quality interior design image in this style: ${style}.

Use the uploaded room photo as the source image.
- Keep the original room layout.
- Keep the same camera angle.
- Keep walls, windows, and room structure consistent.
- Redesign furniture, colors, decor, lighting, and atmosphere.
- Make the result look premium, realistic, and professionally staged.
- Also return structured metadata for listing copy, ROI notes, budget estimate,
  and shop-the-look product suggestions when the backend integration is added.
`;

export async function generateInteriorDesigns(imageFile: File): Promise<GeneratedDesign[]> {
  void imageFile;

  // TODO: Connect this function to Google Gemini / Nano Banana Pro through a backend proxy
  // or serverless function. Do not expose API keys in frontend production code.
  //
  // Suggested server-side configuration:
  // const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  // const model = 'gemini-3-pro-image-preview';
  //
  // Send the uploaded image and one prompt per style:
  // stylePrompts.map((style) => buildInteriorPrompt(style));
  //
  // Keep API credentials on the server, then return sanitized generated image URLs
  // or base64 image payloads to this frontend.

  console.info('Prepared Gemini model:', MODEL_NAME);
  console.info('Prepared interior prompts:', stylePrompts.map(buildInteriorPrompt));

  await new Promise((resolve) => window.setTimeout(resolve, 2800));
  return mockGeneratedDesigns;
}
