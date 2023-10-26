
export const filterDropdown = (array, data, field) => {
  if (data == '') {
    return array
  } else {
    return array.filter(
      (item) => item[field].toLowerCase() === data.toLowerCase()
    )
  }
}

export const filterCheckbox = (array, data, field) => {
  if (data == null) {
    return array
  } else {
    return array.filter(
      (item) => item[field] === data)
  }
}
