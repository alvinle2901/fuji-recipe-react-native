import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useRecipes } from '../hooks/useRecipe';
import RecipeImport from './RecipeImport';

const Imports = ({ data }) => {
  const { data: recipes, isLoading, isError } = useRecipes();
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    if (recipes) {
      // get db_id of imported data
      const filteredData = recipes.map((item) => ({ db_id: item.db_id }));
      setIdList(filteredData);
    }
  }, [recipes]);

  return (
    <View className="px-2">
      {data.map((item, index) => {
        // Check if the recipe is already imported
        const hasMatchingId = idList.some((recipe) => recipe.db_id === item.db_id);
        return <RecipeImport item={item} key={index} isImported={hasMatchingId} />;
      })}
    </View>
  );
};

export default Imports;
