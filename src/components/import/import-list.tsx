import React, { useEffect, useState } from 'react';

import { useRecipes } from '@/lib/hooks';
import { Recipe } from '@/types';

import { ScrollView, View } from '../ui';
import { ImportCard } from './import-card';

type ImportListProps = {
  importData: Recipe[];
};

export const ImportList: React.FC<ImportListProps> = ({ importData }) => {
  const { data: recipes, isLoading, isError } = useRecipes();
  const [idList, setIdList] = useState([]);

  // get db_id of imported importData
  useEffect(() => {
    if (recipes) {
      const filteredData = recipes.map((item: Recipe) => ({ db_id: item.db_id }));
      setIdList(filteredData);
    }
  }, [recipes]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
      <View className="px-2">
        {importData.map((item, index) => {
          // Check if the recipe is already imported
          const hasMatchingId = idList.some((recipe) => recipe.db_id === item.db_id);
          return <ImportCard item={item} key={index} isImported={hasMatchingId} />;
        })}
      </View>
    </ScrollView>
  );
};
