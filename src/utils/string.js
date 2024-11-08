import { filmSimulationData } from '../constants';

// update WB string
export const updateWB = (wb, blue, red, temp) => {
  let whiteBalance = '';
  if (wb == 'Color Temperature') {
    whiteBalance = temp + 'K, ' + red + ' Red & ' + blue + ' Blue';
  } else {
    whiteBalance = wb + ', ' + red + ' Red & ' + blue + ' Blue';
  }

  return whiteBalance;
};

export const updateGrain = (strength, size) => {
  let grain = '';
  if ((strength === size) === 'Off' || (size === null && strength === null)) {
    grain = 'Off';
  } else if (size === 'Off' || size === null) {
    grain = strength;
  } else {
    grain = strength + ', ' + size;
  }

  return grain;
};

export const getTemp = (inputString) => {
  // Extract the number part using a regular expression
  const numberMatch = inputString.match(/^\d+/);

  if (numberMatch) {
    return parseInt(numberMatch[0]);
  } else {
    return null; // Or throw an error if you prefer
  }
};

//new title
export const newTitle = (title) => {
  return title.replaceAll('_', ' ');
};

//positive value
export const positive = (title, value) => {
  if (value > 0 && title != 'iso') {
    return '+' + value;
  } else return value;
};

//get bw value
export const checkBW = (film) => {
  if (
    filmSimulationData.findIndex((object) => {
      return object.label === film;
    }) > 7
  ) {
    return true;
  } else return false;
};
