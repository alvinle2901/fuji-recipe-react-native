export const filter = (array, data, field) => {
  if (data == '') {
    return array
  } else {
    return array.filter(
      (item) => item[field].toLowerCase() === data.toLowerCase()
    )
  }
}
