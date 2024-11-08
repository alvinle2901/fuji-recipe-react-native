export const filterDropdown = (array, data, field) => {
  if (data === '' || data === null || data === undefined) {
    return array;
  } else if (field === 'film_simulation') {
    return array.filter((item) => data.toLowerCase().includes(item[field].toLowerCase()));
  } else if (field === 'sensor') {
    return array.filter((item) => {
      const outputArray = item[field]
        .toLowerCase()
        .split('/')
        .map((item) => item.trim());
      return outputArray.includes(data.toLowerCase());
    });
  } else {
    return array.filter((item) => item[field].toLowerCase() === data.toLowerCase());
  }
};

export const filterCheckbox = (array, data, field) => {
  if (data == null) {
    return array;
  } else {
    return array.filter((item) => item[field] === data);
  }
};

export const filterAndSearch = (data, filters, searchTerm) => {
  let result = data;
  result = filterDropdown(result, filters.film, 'film_simulation');
  result = filterDropdown(result, filters.sensor, 'sensor');
  result = filterCheckbox(result, filters.checkedFav, 'favorite');
  result = filterCheckbox(result, filters.checkedBW, 'bw');
  if (filters.checkedColor != null) result = filterCheckbox(result, !filters.checkedColor, 'bw');
  if (searchTerm != '') {
    result = result.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return result;
};
