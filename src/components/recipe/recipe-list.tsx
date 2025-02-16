import { useCallback, useState } from 'react';

import { Recipe } from '@/types';

import { RefreshControl, ScrollViewRN, View } from '../ui';
import { RecipeCard } from './recipe-card';

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [refreshing, setRefreshing] = useState(false);

  // pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 900);
  }, []);

  return (
    <ScrollViewRN
      showsVerticalScrollIndicator={false}
      className="space-y-6"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="mx-4 flex-row justify-between flex-wrap">
        {recipes.map((item, index) => {
          return <RecipeCard recipe={item} key={index} />;
        })}
      </View>
    </ScrollViewRN>
  );
};
