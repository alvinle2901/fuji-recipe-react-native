import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRecipes } from '../hooks/useRecipe';

import RecipeImport from './RecipeImport';

const Imports = ({ data }) => {
  const { data: recipes, isLoading, isError } = useRecipes();
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    if (recipes) {
      const filteredData = recipes.map((item) => ({ db_id: item.db_id }));
      setIdList(filteredData);
    }
  }, [recipes]);

  return (
    <View className="px-2">
      {data.map((item, index) => {
        const hasMatchingId = idList.some(
          (recipe) => recipe.db_id === item.db_id
        );
        return <RecipeImport item={item} key={index} isImported={hasMatchingId} />;
      })}
    </View>
  );
};

export default Imports;
