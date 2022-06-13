/* eslint-disable @typescript-eslint/no-explicit-any */
// Any type is allowed in this snippet since queryParams can be filled with any property by client.
const getFilterObj = (queryParams: any): object => {
  const filterObj: any = {};
  for (const key in queryParams) {
    if (
      key === 'page' ||
      key === 'sort' ||
      key === 'limit' ||
      key === 'fields'
    ) {
      continue;
    }
    if (typeof queryParams[key] === 'object') {
      filterObj[key] = {};
      for (const subKey in queryParams[key]) {
        if (
          subKey === 'gte' ||
          subKey === 'gt' ||
          subKey === 'lte' ||
          subKey === 'lt'
        ) {
          filterObj[key][`$${subKey}`] = queryParams[key][subKey];
        }
      }
    } else {
      filterObj[key] = queryParams[key];
    }
  }
  return filterObj;
};

export default getFilterObj;
