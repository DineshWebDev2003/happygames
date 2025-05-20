import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Conditionally create the AI instance to avoid issues during build
const createAI = () => {
  // Skip AI initialization during build or when specifically disabled
  if (process.env.NEXT_PUBLIC_SKIP_AI_IN_BUILD === 'true' && 
      process.env.NODE_ENV === 'production' && 
      process.env.NEXT_PHASE === 'phase-production-build') {
    console.log('Skipping AI initialization during build');
    return {
      definePrompt: () => ({
        name: 'skipped-prompt',
      }),
      defineFlow: (_config: any, handler: any) => {
        return () => ({ quiz: [] });
      },
    };
  }

  // Normal initialization for runtime
  return genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.0-flash',
  });
};

export const ai = createAI();
