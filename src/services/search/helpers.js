import qs from 'qs';

export const propNames = {
  QUERY: 'query'
};

const allowedUrlParams = Object.values(propNames);

const fromEntries = arr => arr.reduce((p, [key, v]) => ({ ...p, [key]: v }), {});
export const removeFalsyValues = props => fromEntries(
  Object.entries(props)
    .filter(
      ([key, value]) => allowedUrlParams.includes(key) && value,
    ),
);

export const getSearchFromString = (str = "?") => {
  const obj = qs.parse(str.slice(1));
  return removeFalsyValues(obj)
}

export const getStringFromSearch = (search = {}) => {
  const validated = removeFalsyValues(search);
  return qs.stringify(validated)
}