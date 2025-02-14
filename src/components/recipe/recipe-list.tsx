import { Recipe } from '@/types';

import { View } from '../ui';
import { RecipeCard } from './recipe-card';

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {recipes.map((item, index) => {
        return <RecipeCard recipe={item} key={index} />;
      })}
    </View>
  );
};
