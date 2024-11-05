// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECIPES_KEY = 'recipes';

export const saveRecipes = async (recipes) => {
  try {
    const jsonValue = JSON.stringify(recipes);
    await AsyncStorage.setItem(RECIPES_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save recipes:', e);
  }
};

export const getRecipes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(RECIPES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch recipes:', e);
    return [];
  }
};

export const deleteRecipeById = async (id) => {
  try {
    const recipes = await getRecipes();
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    await saveRecipes(updatedRecipes);
  } catch (e) {
    console.error('Failed to delete recipe:', e);
  }
};

// Update recipe by ID
export const updateRecipeById = async (id, updatedData) => {
  const recipes = await getRecipes();
  const updatedRecipes = recipes.map((recipe) =>
    recipe.id === id ? { ...recipe, ...updatedData } : recipe
  );
  await saveRecipes(updatedRecipes);
};

// Update a field of a recipe by ID
export const updateRecipeFieldById = async (id, field, value) => {
  const recipes = await getRecipes();
  const updatedRecipes = recipes.map((recipe) =>
    recipe.id === id ? { ...recipe, [field]: value } : recipe
  );
  await saveRecipes(updatedRecipes);
};

export const clearAllData = () => {
  AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => alert('success'));
}
