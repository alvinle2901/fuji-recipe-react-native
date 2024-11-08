import React from 'react';
import { View } from 'react-native';

import RecipeCard from './RecipeCard';

const Recipes = ({ data }) => {
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {data.map((item, index) => {
        return <RecipeCard item={item} key={index} />;
      })}
    </View>
  );
};

export default Recipes;
