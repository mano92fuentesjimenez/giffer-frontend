import qs from 'qs';
import {SEARCH_TYPES} from "./constants";

export const propNames = {
  QUERY: 'query',
  TYPE: 'type',
};

const allowedUrlParams = Object.values(propNames);

const fromEntries = arr => arr.reduce((p, [key, v]) => ({ ...p, [key]: v }), {});
export const removeFalsyValues = props => fromEntries(
  Object.entries(props)
    .filter(
      ([key, value]) => allowedUrlParams.includes(key) && value,
    ),
);

export const validateSearch = (search) => {
  const validEntries = removeFalsyValues(search)

  if(validEntries.query && validEntries.query !== '')
    validEntries.type = SEARCH_TYPES.SEARCH;

  return validEntries;
}

export const getSearchFromString = (str = "?") => {
  const obj = qs.parse(str.slice(1));
  return validateSearch(obj)
}

export const getStringFromSearch = (search = {}) => {
  const validated = validateSearch(search);
  return qs.stringify(validated)
}