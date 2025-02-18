import React, { useCallback } from 'react';

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

import { filmSimulationData, sensorData } from '@/lib/constants';
import { hp, wp } from '@/lib/dimensions';
import { filterAndSearch } from '@/lib/filter';

import { Checkbox, StyleSheet, Text, TouchableOpacity, View } from './ui';
import { FilterDropdown } from './filter-dropdown';

export const FilterBottomSheet = ({
  fetchedData,
  setData,
  setIsFilterUp,
  filters,
  setFilters,
  searchTerm,
}) => {
  const { film, sensor, checkedFav, checkedBW, checkedColor } = filters;
  // render backdrop for bottom sheet
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
  const handleFilter = () => {
    setData(filterAndSearch(fetchedData, filters, searchTerm));
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
          setIsFilterUp(false);
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
            value={sensor}
            setValue={setFilters}
          />
          {/* Film Sensor */}
          <FilterDropdown
            data={filmSimulationData}
            icon={require('../../assets/recipe_icon/film.png')}
            field={'Film Simulation'}
            value={film}
            setValue={setFilters}
          />
          {/* Checkbox-es */}
          <View className="flex-row py-4 w-full">
            <Checkbox
              text={'Favorite'}
              checked={checkedFav}
              onPress={() => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  checkedFav: !checkedFav,
                }));
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
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  checkedColor: !checkedColor,
                  checkedBW: checkedColor,
                }));
              }}
            />
            <Checkbox
              text={'B&W'}
              checked={checkedBW}
              onPress={() => {
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  checkedColor: checkedBW,
                  checkedBW: !checkedBW,
                }));
              }}
            />
          </View>
          {/* Filter buttons */}
          <View className="flex-row items-center justify-center my-4 mt-4">
            <TouchableOpacity
              className="flex-1 items-center my-2 rounded-xl bg-[#9e9ca3] py-2 mx-3"
              onPress={() => {
                setFilters({
                  film: '',
                  sensor: '',
                  checkedFav: null,
                  checkedBW: null,
                  checkedColor: null,
                });
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
                handleFilter();
                setIsFilterUp(false);
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
