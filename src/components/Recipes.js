import { View } from 'react-native'
import React from 'react'

import { destinationData } from '../constants/index'
import RecipeCard from './RecipeCard'

const Recipes = () => {
  return (
    <View className="mx-4 flex-row justify-between flex-wrap">
      {destinationData.map((item, index) => {
        return <RecipeCard item={item} key={index} />
      })}
    </View>
  )
}

export default Recipes
