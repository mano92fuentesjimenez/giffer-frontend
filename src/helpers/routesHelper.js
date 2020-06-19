import { getSearchFromString } from "services/search/helpers";
import { SEARCH_TYPES } from "services/search/constants";

export const wasTypeTrendingLastPath = ({ meta: { previousLocation: { search } }}) => {
  return getSearchFromString(search).type === SEARCH_TYPES.TRENDING;
}

export const wasLastRouteTheSame = ({ meta: { previousLocation: { location } }}, pathname) => location === pathname;