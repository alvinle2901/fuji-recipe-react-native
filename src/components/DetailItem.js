import { Text, View } from 'react-native'
import React from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const DetailItem = ({ title, detail }) => {
  const newTitle = title.replaceAll('_', ' ')

  return (
    <View
      className="flex-row justify-end items-start py-4"
      style={{ borderRadius: 1, borderBottomWidth: 1, borderColor: 'grey' }}
    >
      <Text
        className="flex-1 uppercase font-light mr-5"
        style={{ fontSize: wp(4) }}
      >
        {newTitle}
      </Text>
      <Text className="flex-1 font-bold" style={{ fontSize: wp(4) }}>
        {detail}
      </Text>
    </View>
  )
}

export default DetailItem
