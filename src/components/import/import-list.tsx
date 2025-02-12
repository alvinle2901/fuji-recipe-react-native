import { useRecipes } from '@/lib/hooks';

import React, { useEffect, useState } from 'react';

import { View } from '../ui';
import { ImportCard } from './import-card';

export const ImportList = ({ data }) => {
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
        return <ImportCard item={item} key={index} isImported={hasMatchingId} />;
      })}
    </View>
  );
};
