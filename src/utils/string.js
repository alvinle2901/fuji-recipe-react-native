import { filmSimulationData } from '../constants'

// update WB string
export const updateWB = (wb, blue, red, temp) => {
  let whiteBalance = ''
  if (wb == 'Color Temperature') {
    whiteBalance = temp + 'K, ' + red + ' Red & ' + blue + ' Blue'
  } else {
    whiteBalance = wb + ', ' + red + ' Red & ' + blue + ' Blue'
  }

  return whiteBalance
}

//new title
export const newTitle = (title) => {
  return title.replaceAll('_', ' ')
}

//positive value
export const positive = (title, value) => {
  if (value > 0 && title != 'iso') {
    return '+' + value
  } else return value
}

//get bw value
export const checkBW = (film) => {
  if (
    filmSimulationData.findIndex((object) => {
      return object.label === film
    }) > 7
  ) {
    return true
  } else return false
}
