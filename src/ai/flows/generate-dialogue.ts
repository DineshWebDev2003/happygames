'use server';

/**
 * @fileOverview Generates dialogue responses for interactive conversations.
 *
 * - generateDialogueResponse - A function that generates a dialogue response based on conversation history.
 * - GenerateDialogueInput - The input type for the generateDialogueResponse function.
 * - GenerateDialogueOutput - The return type for the generateDialogueResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDialogueInputSchema = z.object({
  characterName: z
    .string()
    .describe('The name of the character responding.'),
  characterRole: z
    .string()
    .describe('The role or profession of the character (e.g., doctor, teacher).'),
  userMessage: z
    .string()
    .describe('The message from the user that the character is responding to.'),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['ai', 'user']).describe('Who sent the message.'),
        content: z.string().describe('The content of the message.'),
      })
    )
    .describe('The history of the conversation so far.'),
});
export type GenerateDialogueInput = z.infer<typeof GenerateDialogueInputSchema>;

const GenerateDialogueOutputSchema = z.object({
  response: z.string().describe('The generated dialogue response from the character.'),
});
export type GenerateDialogueOutput = z.infer<typeof GenerateDialogueOutputSchema>;

export async function generateDialogueResponse(input: GenerateDialogueInput): Promise<GenerateDialogueOutput> {
  return generateDialogueFlow(input);
}

const generateDialoguePrompt = ai.definePrompt({
  name: 'generateDialoguePrompt',
  input: {schema: GenerateDialogueInputSchema},
  output: {schema: GenerateDialogueOutputSchema},
  prompt: `You are {{characterName}}, a {{characterRole}}. You are having a conversation with a child. 
  
Your responses should be:
1. Age-appropriate for children
2. Educational and helpful
3. Encouraging and positive
4. In character for your role as {{characterRole}}
5. Brief and to the point (1-3 sentences)

Here is the conversation history so far:
{{#each conversationHistory}}
{{#eq role "user"}}Child: {{content}}{{/eq}}
{{#eq role "ai"}}{{../characterName}}: {{content}}{{/eq}}
{{/each}}

The child's most recent message is: "{{userMessage}}"

Respond as {{characterName}} the {{characterRole}} in a helpful, educational, and age-appropriate way.
`, 
});

const generateDialogueFlow = ai.defineFlow(
  {
    name: 'generateDialogueFlow',
    inputSchema: GenerateDialogueInputSchema,
    outputSchema: GenerateDialogueOutputSchema,
  },
  async input => {
    const {output} = await generateDialoguePrompt(input);
    return output!;
  }
); 