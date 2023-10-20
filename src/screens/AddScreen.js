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
import { Formik } from 'formik'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { filmElements } from '../constants'

const AddScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* avatar */}
        <View className="items-center mb-3 mt-12">
          <Text
            style={{ fontSize: wp(6) }}
            className="font-semibold text-neutral-700"
          >
            Add New Recipe
          </Text>
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

        <View className="mx-5">
          <Formik
            initialValues={{ email: '' }}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddScreen

const styles = StyleSheet.create({})
