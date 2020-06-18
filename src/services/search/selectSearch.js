import { getSearch } from 'connected-react-router';
import {getSearchFromString} from "./helpers";

export default (state) => getSearchFromString(getSearch(state));