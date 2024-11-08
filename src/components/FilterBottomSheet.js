import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

import Checkbox from '../components/Checkbox';
import FilterDropdown from '../components/FilterDropdown';
import { filmSimulationData, sensorData } from '../constants';
import { filterCheckbox, filterDropdown } from '../utils/filter';

const FilterBottomSheet = ({
  fetchedData,
  setData,
  setFilterBar,
  filterSensor,
  setFilterSensor,
  filterFilm,
  setFilterFilm,
  checkedFav,
  setCheckedFav,
  checkedColor,
  setCheckedColor,
  checkedBW,
  setCheckedBW,
}) => {
  // handle backdrop for bottom sheet
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );
  // handle filter function
  const handleFilter = (sensor, film, favorite, bw, color) => {
    let result = fetchedData;
    result = filterDropdown(result, film, 'film_simulation');
    result = filterDropdown(result, sensor, 'sensor');
    result = filterCheckbox(result, favorite, 'favorite');
    result = filterCheckbox(result, bw, 'bw');
    if (color != null) result = filterCheckbox(result, !color, 'bw');
    setData(result);
  };

  return (
    <BottomSheet
      style={styles.bottomSheet}
      snapPoints={[hp(60)]}
      enableOverDrag={false}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        if (index == -1) {
          setFilterBar(false);
        }
      }}
    >
      <BottomSheetView>
        <View>
          <View
            className="pb-2 mb-1"
            style={{
              borderRadius: 1,
              borderBottomWidth: 0.7,
              borderColor: 'grey',
            }}
          >
            <Text
              style={{
                fontSize: wp(10),
                fontFamily: 'fin_thin',
              }}
            >
              Filter
            </Text>
          </View>
          {/* Sensor Filter */}
          <FilterDropdown
            data={sensorData}
            icon={require('../../assets/recipe_icon/sensor.png')}
            field={'Sensor'}
            value={filterSensor}
            setValue={setFilterSensor}
          />
          {/* Film Sensor */}
          <FilterDropdown
            data={filmSimulationData}
            icon={require('../../assets/recipe_icon/film.png')}
            field={'Film Simulation'}
            value={filterFilm}
            setValue={setFilterFilm}
          />
          {/* Checkbox-es */}
          <View className="flex-row py-4 w-full">
            <Checkbox
              text={'Favorite'}
              checked={checkedFav}
              onPress={() => {
                setCheckedFav(!checkedFav);
              }}
            />
          </View>
          <View
            className="flex-row w-full pb-3"
            style={{
              borderRadius: 1,
              borderBottomWidth: 1,
              borderColor: '#f0eff2',
            }}
          >
            <Checkbox
              text={'Color'}
              checked={checkedColor}
              onPress={() => {
                setCheckedColor(!checkedColor);
                setCheckedBW(checkedColor);
              }}
            />
            <Checkbox
              text={'B&W'}
              checked={checkedBW}
              onPress={() => {
                setCheckedBW(!checkedBW);
                setCheckedColor(checkedBW);
              }}
            />
          </View>
          {/* Filter buttons */}
          <View className="flex-row items-center justify-center my-4 mt-4">
            <TouchableOpacity
              className="flex-1 items-center my-2 rounded-xl bg-[#9e9ca3] py-2 mx-3"
              onPress={() => {
                setCheckedBW(null);
                setCheckedColor(null);
                setCheckedFav(null);
                setFilterFilm('');
                setFilterSensor('');
              }}
            >
              <Text
                style={{
                  fontSize: wp(8),
                  color: 'white',
                  fontFamily: 'fin_thin',
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center my-2 rounded-xl bg-black py-2 mx-3"
              onPress={() => {
                handleFilter(filterSensor, filterFilm, checkedFav, checkedBW, checkedColor);
                setFilterBar(false);
              }}
            >
              <Text
                style={{
                  fontSize: wp(8),
                  color: 'white',
                  fontFamily: 'fin_thin',
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
