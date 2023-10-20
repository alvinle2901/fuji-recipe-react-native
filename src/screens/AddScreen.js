import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native'
import React from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { filmElements } from '../constants'

const AddScreen = ({ navigation, route }) => {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-3 mt-10">
          <Text
            style={{ fontSize: wp(6) }}
            className="font-bold text-neutral-700"
          >
            Create New Recipe
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: wp(5) }} className="text-green-500">
              Save
            </Text>
          </TouchableOpacity>
        </View>
        {/* items */}
        <View className="mx-5">
          {/* {filmElements.map((element) => {
            return (
              <Text
                style={{ fontSize: wp(5) }}
                className="font-semibold text-neutral-700 mb-3"
              >
                {element}
              </Text>
            )
          })} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddScreen

const styles = StyleSheet.create({})
