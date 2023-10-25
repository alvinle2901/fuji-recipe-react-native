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
