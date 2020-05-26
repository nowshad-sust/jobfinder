import {
	SET_KEYWORD,
	SET_CITIES,
	SET_COMPANIES,
	SET_INVESTORS,
} from "./consts";

const reducers = (state, action) => {
	switch (action.type) {
		case SET_KEYWORD:
			return {
				...state,
				keyword: action.payload,
			};
		case SET_CITIES:
			return {
				...state,
				cities: action.payload,
			};
		case SET_COMPANIES:
			return {
				...state,
				companies: action.payload,
			};
		case SET_INVESTORS:
			return {
				...state,
				investors: action.payload,
			};
		default:
			return state;
	}
};
export default reducers;
