import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import { Layout, Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_FILTERS } from "../queries/Filters";
import { store } from "../store/store";
import * as actions from "../store/actions";
import { Shimmer, ErrorBlock } from "./Commons";

const { Sider } = Layout;
const { Option } = Select;

const useQueryParams = () => {
	return queryString.parse(useLocation().search);
};

const Filter = () => {
	const query = useQueryParams();
	const history = useHistory();
	const { state, dispatch } = useContext(store);
	const [keyword, setKeyword] = useState(state.keyword);
	const [cities, setCities] = useState(state.cities);
	const [companies, setCompanies] = useState(state.companies);
	const [investors, setInvestors] = useState(state.investors);
	const { loading, error, data } = useQuery(QUERY_FILTERS);

	// Update states when loaded with query params
	// or query changes
	useEffect(() => {
		setGlobalQuery(query);
		setLocalQuery(query);
	}, [JSON.stringify(query)]);

	// set global state filters
	const setGlobalQuery = ({
		keyword = "",
		cities = [],
		companies = [],
		investors = [],
	}) => {
		dispatch(actions.setKeyword(keyword));
		dispatch(actions.setCities(cities));
		dispatch(actions.setCompanies(companies));
		dispatch(actions.setInvestors(investors));
	};

	// set local filter states
	const setLocalQuery = ({
		keyword = "",
		cities = [],
		companies = [],
		investors = [],
	}) => {
		setKeyword(keyword);
		setCities(cities);
		setCompanies(companies);
		setInvestors(investors);
	};

	const onSubmit = () => {
		// conditionally add queries
		const query = {
			...(keyword && { keyword }),
			...(cities && { cities }),
			...(companies && { companies }),
			...(investors && { investors }),
		};
		setGlobalQuery(query);
		const url = queryString.stringifyUrl({
			url: "",
			query,
		});

		history.push(url);
	};

	const onReset = () => {
		// only for handling when query is empty
		setLocalQuery({});

		//removes all the filters
		history.push("");
	};

	if (loading) return <Shimmer />;
	if (error) return <ErrorBlock />;

	const citiesArray = data.cities.map((obj) => obj.city);
	const companiesArray = data.companies.map((c) => c.name);
	const investorsArray = data.investors; // we'll use ids for query

	return (
		<Sider
			size="large"
			width="30%"
			breakpoint="lg"
			theme="light"
			style={{
				padding: "0 20px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				marginTop: "50px",
				paddingTop: "25px",
			}}
		>
			<div className="logo" />
			<Input
				size="large"
				style={{ width: "100%", margin: "10px 0" }}
				defaultValue=""
				value={keyword}
				placeholder="Search jobs"
				suffix={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="City"
				defaultValue={[]}
				value={cities}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(values) => setCities(values)}
			>
				{citiesArray.map((city, i) => (
					<Option key={i} value={city}>
						{city}
					</Option>
				))}
			</Select>

			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="Company"
				defaultValue={[]}
				value={companies}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(values) => setCompanies(values)}
			>
				{companiesArray.map((company, i) => (
					<Option key={i} value={company}>
						{company}
					</Option>
				))}
			</Select>
			<Select
				size="large"
				mode="multiple"
				style={{ width: "100%", margin: "10px 0" }}
				placeholder="Investor"
				defaultValue={[]}
				value={investors}
				suffixIcon={
					<SearchOutlined style={{ fontSize: "20px", color: "#fb266b" }} />
				}
				onChange={(values) => setInvestors(values)}
			>
				{investorsArray.map((investor, i) => (
					<Option key={i} value={`${investor.id}`}>
						{investor.name}
					</Option>
				))}
			</Select>
			<Button
				type="primary"
				onClick={onSubmit}
				danger="true"
				disabled={
					!keyword && !cities.length && !companies.length && !investors.length
				}
			>
				Search
			</Button>
			<Button
				type="default"
				style={{ float: "right" }}
				danger="true"
				onClick={onReset}
			>
				Reset
			</Button>
		</Sider>
	);
};

export default Filter;
