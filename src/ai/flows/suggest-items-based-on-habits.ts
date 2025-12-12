'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests grocery items to the user based on their past shopping habits and common grocery items.
 *
 * The flow takes a list of past shopping lists as input and returns a list of suggested items.
 *
 * @interface SuggestItemsBasedOnHabitsInput - The input type for the suggestItemsBasedOnHabits function.
 * @interface SuggestItemsBasedOnHabitsOutput - The output type for the suggestItemsBasedOnHabits function.
 * @function suggestItemsBasedOnHabits - The main function that triggers the flow and returns suggested items.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestItemsBasedOnHabitsInputSchema = z.object({
  pastShoppingLists: z
    .array(z.string())
    .describe('An array of past shopping lists, each represented as a string.'),
});
export type SuggestItemsBasedOnHabitsInput = z.infer<typeof SuggestItemsBasedOnHabitsInputSchema>;

const SuggestItemsBasedOnHabitsOutputSchema = z.object({
  suggestedItems: z
    .array(z.string())
    .describe('An array of suggested grocery items based on past habits.'),
});
export type SuggestItemsBasedOnHabitsOutput = z.infer<typeof SuggestItemsBasedOnHabitsOutputSchema>;

export async function suggestItemsBasedOnHabits(
  input: SuggestItemsBasedOnHabitsInput
): Promise<SuggestItemsBasedOnHabitsOutput> {
  return suggestItemsBasedOnHabitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestItemsBasedOnHabitsPrompt',
  input: {schema: SuggestItemsBasedOnHabitsInputSchema},
  output: {schema: SuggestItemsBasedOnHabitsOutputSchema},
  prompt: `You are a helpful shopping assistant. Given the user's past shopping lists, suggest a list of items they might want to add to their current list.

Past Shopping Lists:
{{#each pastShoppingLists}}
- {{this}}
{{/each}}

Suggested Items:`,
});

const suggestItemsBasedOnHabitsFlow = ai.defineFlow(
  {
    name: 'suggestItemsBasedOnHabitsFlow',
    inputSchema: SuggestItemsBasedOnHabitsInputSchema,
    outputSchema: SuggestItemsBasedOnHabitsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
