import qs from 'qs';

export default (str) => {
  return qs.parse(str.slice(1));
}