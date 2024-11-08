import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteRecipeById,
  getRecipes,
  saveRecipes,
  updateRecipeById,
  updateRecipeFieldById,
} from '../storage';

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

export const useSaveRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRecipe) => {
      const recipes = await getRecipes();
      const updatedRecipes = [...recipes, newRecipe];
      await saveRecipes(updatedRecipes);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(RECIPES_QUERY_KEY);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await deleteRecipeById(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(RECIPES_QUERY_KEY);
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await updateRecipeById(data.id, data.updatedRecipe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(RECIPES_QUERY_KEY);
    },
  });
};

export const useUpdateRecipeField = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await updateRecipeFieldById(data.id, data.field, data.value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(RECIPES_QUERY_KEY);
    },
  });
};
