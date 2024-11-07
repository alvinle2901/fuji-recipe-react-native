export const filterDropdown = (array, data, field) => {
  if (data === '' || data === null) {
    return array;
  } else if (field === 'film_simulation') {
    return array.filter((item) =>
      data.toLowerCase().includes(item[field].toLowerCase())
    );
  } else if (field === 'sensor') {
    return array.filter((item) => {
      const outputArray = item[field]
        .toLowerCase()
        .split('/')
        .map((item) => item.trim());
      return outputArray.includes(data.toLowerCase());
    });
  } else {
    return array.filter(
      (item) => item[field].toLowerCase() === data.toLowerCase()
    );
  }
};

export const filterCheckbox = (array, data, field) => {
  if (data == null) {
    return array;
  } else {
    return array.filter((item) => item[field] === data);
  }
};
