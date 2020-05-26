import {
	SET_KEYWORD,
	SET_CITIES,
	SET_COMPANIES,
	SET_INVESTORS,
} from "./consts";

export const setKeyword = (payload) => ({
	type: SET_KEYWORD,
	payload,
});

export const setCities = (payload) => ({
	type: SET_CITIES,
	payload,
});

export const setCompanies = (payload) => ({
	type: SET_COMPANIES,
	payload,
});

export const setInvestors = (payload) => ({
	type: SET_INVESTORS,
	payload,
});
