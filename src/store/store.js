import React, { createContext, useReducer } from "react";
import reducers from "./reducers";

const initialState = {
	keyword: "",
	cities: [],
	companies: [],
	investors: [],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducers, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
