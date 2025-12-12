'use server';

import {
  suggestItemsBasedOnHabits,
  type SuggestItemsBasedOnHabitsInput,
} from '@/ai/flows/suggest-items-based-on-habits';

export async function getAiSuggestions(
  input: SuggestItemsBasedOnHabitsInput
) {
  try {
    const result = await suggestItemsBasedOnHabits(input);
    return result;
  } catch (error) {
    console.error('Error in getAiSuggestions:', error);
    throw new Error('Failed to get AI suggestions');
  }
}
