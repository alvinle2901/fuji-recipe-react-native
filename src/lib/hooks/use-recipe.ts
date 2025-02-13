import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteRecipeById,
  getRecipes,
  saveRecipes,
  updateRecipeById,
  updateRecipeFieldById,
} from '@/storage';
import { Recipe } from '@/types';

// Key for caching
const RECIPES_QUERY_KEY = ['recipes'];

export const useRecipes = () => {
  return useQuery({
    queryKey: RECIPES_QUERY_KEY,
    queryFn: getRecipes,
    ...{
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  });
};

// Save recipe to local
export const useSaveRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRecipe: Recipe) => {
      const recipes: Recipe[] = await getRecipes();
      const updatedRecipes = [...recipes, newRecipe];
      await saveRecipes(updatedRecipes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await deleteRecipeById(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedRecipe }: { id: string; updatedRecipe: Recipe }) => {
      await updateRecipeById(id, updatedRecipe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
    },
  });
};

export const useUpdateRecipeField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: keyof Recipe; value: any }) => {
      await updateRecipeFieldById(id, field, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
    },
  });
};
