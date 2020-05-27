import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import { Layout, Input, Select, Button, Typography } from "antd";
import {
	SearchOutlined,
	AuditOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import {
	BrowserRouter as Router,
	Link,
	useLocation,
	useHistory,
} from "react-router-dom";
import { store } from "../store/store";
import * as actions from "../store/actions";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const citiesArray = ["Berlin", "Munich", "Cologne", "Hamburg", "Dusseldorf"];
const companiesArray = ["Personio", "HelloFresh"];
const investorIds = [30, 25, 34];

const useQuery = () => {
	return queryString.parse(useLocation().search);
};

const Filter = () => {
	const query = useQuery();
	const history = useHistory();
	const { state, dispatch } = useContext(store);

	const [keyword, setKeyword] = useState(state.keyword);
	const [cities, setCities] = useState(state.cities);
	const [companies, setCompanies] = useState(state.companies);
	const [investors, setInvestors] = useState(state.investors);

	useEffect(() => {
		setGlobalQuery(query);
		setLocalQuery(query);
	}, [JSON.stringify(query)]);

	const setGlobalQuery = ({
		keyword = "",
		cities = [],
		companies = [],
		investor = [],
	}) => {
		dispatch(actions.setKeyword(keyword));
		dispatch(actions.setCities(cities));
		dispatch(actions.setCompanies(companies));
		dispatch(actions.setInvestors(investors));
	};

	const setLocalQuery = ({
		keyword = "",
		cities = [],
		companies = [],
		investor = [],
	}) => {
		setKeyword(keyword);
		setCities(cities);
		setCompanies(companies);
		setInvestors(investors);
	};

	const onSubmit = () => {
		setGlobalQuery(query);
		const url = queryString.stringifyUrl({
			url: "",
			query: {
				keyword,
				cities,
				companies,
				investors,
			},
		});

		history.push(url);
	};

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
				{investorIds.map((investor, i) => (
					<Option key={i} value={investor}>
						{investor}
					</Option>
				))}
			</Select>
			<Button type="primary" onClick={onSubmit} danger>
				Search
			</Button>
			<Link to="" style={{ float: "right" }} danger>
				<Button type="default">Search</Button>
			</Link>
		</Sider>
	);
};

export default Filter;
